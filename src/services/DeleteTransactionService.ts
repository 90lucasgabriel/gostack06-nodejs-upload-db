import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const repository = getRepository(Transaction);
    const transaction = await repository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new AppError('Transaction ID not found.');
    }

    await repository.delete(id);
  }
}

export default DeleteTransactionService;
