import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';

import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

import Transaction from '../models/Transaction';

interface Request {
  filename: string;
}

interface RequestTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute({ filename }: Request): Promise<Transaction[]> {
    let rows = [];
    let transactions = [];
    const createTransaction = new CreateTransactionService();

    const transactionFilePath = await path.join(
      uploadConfig.directory,
      filename,
    );

    // Check file
    const transactionFileExists = await fs.promises.stat(transactionFilePath);
    if (!transactionFileExists) {
      throw new AppError('File not found.');
    }

    // Read file
    const content = await fs.readFileSync(transactionFilePath, 'utf8');

    // Remove first line
    rows = content.split('\n');
    rows.splice(0, 1);

    // File iteration
    const finished = rows.map(async t => {
      const [title, type, value, category] = t.split(', ');

      const transaction: RequestTransaction = {
        title: title,
        type: type as 'income' | 'outcome',
        value: +value,
        category: category,
      };

      return await createTransaction.execute(transaction);
    });

    // Map returns an array of Promises<Transaction>
    transactions = await Promise.all(finished);

    return transactions;
  }
}

export default ImportTransactionsService;
