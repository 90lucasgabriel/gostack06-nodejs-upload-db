import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const repository = getRepository(Transaction);
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    const incomeList = await repository.find({ where: { type: 'income' } });
    balance.income = incomeList.reduce((sum, { value }) => sum + value, 0);

    const outcomeList = await repository.find({ where: { type: 'outcome' } });
    balance.outcome = outcomeList.reduce((sum, { value }) => sum + value, 0);

    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export default TransactionsRepository;
