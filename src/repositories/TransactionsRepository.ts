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
    const incomeTransactions = await this.find({ where: { type: 'income' } });

    const incomeTotal = incomeTransactions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0,
    );

    const outcomeTransactions = await this.find({ where: { type: 'outcome' } });

    const outcomeTotal = outcomeTransactions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.value,
      0,
    );

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }
}

export default TransactionsRepository;
