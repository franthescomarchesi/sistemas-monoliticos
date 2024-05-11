import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDTO, PaymentFacadeOutputDTO } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface{

    constructor(private processPaymentUsecase: UsecaseInterface) {}

    process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
        return this.processPaymentUsecase.execute(input)
    }
    
}