import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // const balance: Balance = { income: 0, outcome: 0, total: 0 };

    // balance.income = this.transactions
    //   .filter(transaction => transaction.type === 'income')
    //   .reduce((sum, { value }) => sum + value, 0);

    // balance.outcome = this.transactions
    //   .filter(transaction => transaction.type === 'outcome')
    //   .reduce((sum, { value }) => sum + value, 0);

    // balance.total = balance.income - balance.outcome;

    // return balance;
  }
}

export default TransactionsRepository;
