import { Sequelize } from "sequelize-typescript"
import TransactionModel from "../repository/transaction.model"
import ProcessPaymentUsecase from "../usecase/process-payment/process-payment.usecase"
import TransactionRepository from "../repository/transaction.repository"
import PaymentFacade from "./payment.facade"
import PaymentFacadeFactory from "../factory/payment.facade.factory"

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

    it("Should create a transaction", async () => {
        const input = {
            orderId: "1",
            amount: 100
        }
        const transactionRepository = new TransactionRepository()
        const processPaymentUsecase = new ProcessPaymentUsecase(transactionRepository)
        const paymentFacade = new PaymentFacade(processPaymentUsecase)
        const output = await paymentFacade.process(input)
        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.status).toBe("approved")
        expect(output.amount).toBe(input.amount)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })

    it("Should create a transaction with factory", async () => {
        const input = {
            orderId: "1",
            amount: 100
        }
        const paymentFacade = PaymentFacadeFactory.create()
        const output = await paymentFacade.process(input)
        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.status).toBe("approved")
        expect(output.amount).toBe(input.amount)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })

})