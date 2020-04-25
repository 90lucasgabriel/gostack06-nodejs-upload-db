import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const categoryService = new CreateCategoryService();
    const categoryObj = await categoryService.execute({ title: category });

    // const checkTransactionExists = await transactionRepository.findOne({
    //   where: { email },
    // });

    // if (checkTransactionExists) {
    //   throw new AppError('This email is already used.');
    // }

    // const hashedPassword = await hash(password, 8);

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryObj.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
