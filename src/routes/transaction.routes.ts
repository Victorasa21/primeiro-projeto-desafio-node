import { Router } from 'express'
import uuid from 'uuidv4'

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'

const transactionRouter = Router()

const transactionsRepository = new TransactionsRepository()

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()

    const balance = transactionsRepository.getBalance()

    const listWithBalance = {
      transactions,
      balance: balance,
    }
    return response.json(listWithBalance)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body

    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    )
    const newTransaction = createTransactionService.execute({
      title,
      type,
      value,
    })
    return response.json(newTransaction)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default transactionRouter
