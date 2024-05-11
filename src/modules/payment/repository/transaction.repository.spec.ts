import { Sequelize } from "sequelize-typescript"
import TransactionModel from "./transaction.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import Transaction from "../domain/transaction"
import TransactionRepository from "./transaction.repository"

describe("Transaction repository test", () => {

    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory:",
           logging: false,
           sync: { force: true } 
        })
        await sequelize.addModels([TransactionModel])
        await sequelize.sync()
    }) 

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should save a transaction", async () => {
        const props = {
            orderId: "1",
            amount: 100
        }
        const transaction = new Transaction(props)
        transaction.process()
        const transactionRepository = new TransactionRepository()
        const output = await transactionRepository.save(transaction)
        expect(output.id.id).toBe(transaction.id.id)
        expect(output.orderId).toBe(transaction.orderId)
        expect(output.status).toBe(transaction.status)
        expect(output.amount).toBe(transaction.amount)
        expect(output.createdAt).toBe(transaction.createdAt)
        expect(output.updatedAt).toBe(transaction.updatedAt)
    })

})