import ProcessPaymentUsecase from "./process-payment.usecase"

const mockRepository = () => {
    return {
        save: jest.fn()
    }
}

describe("ProcessPaymentUsecase unit test", () => {
    it("Should save a payment and status has to be approved", async () => {
        const transactionRepository = mockRepository()
        const processPaymentUsecase = new ProcessPaymentUsecase(transactionRepository)
        const input = {
            orderId: "1",
            amount: 100
        }
        const output = await processPaymentUsecase.execute(input)
        expect(transactionRepository.save).toHaveBeenCalled()
        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.status).toBe("approved")
        expect(output.amount).toBe(input.amount)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })

    it("Should save a payment and status has to be declined", async () => {
        const transactionRepository = mockRepository()
        const processPaymentUsecase = new ProcessPaymentUsecase(transactionRepository)
        const input = {
            orderId: "1",
            amount: 90
        }
        const output = await processPaymentUsecase.execute(input)
        expect(transactionRepository.save).toHaveBeenCalled()
        expect(output.transactionId).toBeDefined()
        expect(output.orderId).toBe(input.orderId)
        expect(output.status).toBe("declined")
        expect(output.amount).toBe(input.amount)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
    })
})