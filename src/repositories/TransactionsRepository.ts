import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface TransactionDTO {
  title: string

  value: number

  type: 'income' | 'outcome'
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor () {
    this.transactions = []
  }

  public all (): Transaction[] {
    return this.transactions
  }

  public getBalance (): Balance {
    const incomeBalance = this.transactions
      .filter(item => item.type === 'income')
      .reduce((sum, item) => sum + item.value, 0)

    const outcomeBalance = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((sum, item) => sum + item.value, 0)

      const balance = {
        income: incomeBalance,
        outcome: outcomeBalance,
        total: incomeBalance - outcomeBalance,
      }
      return balance
  }

  public create ({ title, type, value }: TransactionDTO): Transaction {

    const transaction = new Transaction({
      title,
      type,
      value,
    })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository
