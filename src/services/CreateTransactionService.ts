import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface DataDTO {
  title: string

  value: number

  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor (transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository
  }

  public execute ({ title, value, type }: DataDTO): Transaction {

    const balance = this.transactionsRepository.getBalance()

    console.log('balance', balance)

    if (type === "outcome" && value > balance.total) {
      throw Error('Deu ruim, não posso comprar isso!')
    } else {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      })
      return transaction
    }
  }
}

export default CreateTransactionService
