import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from "./process-payment.dto";

export default class ProcessPaymentUsecase implements UsecaseInterface {

    constructor(private transactionRepository: PaymentGateway) {}

    async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
        const props = {
            orderId: input.orderId,
            amount: input.amount
        }
        const transaction = new Transaction(props)
        transaction.process()
        this.transactionRepository.save(transaction)
        return {
            transactionId: transaction.id.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }
    }
    
}