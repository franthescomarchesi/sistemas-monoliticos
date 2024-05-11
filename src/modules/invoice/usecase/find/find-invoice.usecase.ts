import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface"
import InvoiceGateway from "../../gateway/invoice.gateway"
import { FindInvoiceUsecaseInputDTO, FindInvoiceUsecaseOutputDTO } from "./find-invoice.usecase.dto"

export default class FindInvoiceUsecase implements UsecaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: FindInvoiceUsecaseInputDTO): Promise<FindInvoiceUsecaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id)
        const output = {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            },
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total,
            createdAt: invoice.createdAt
        }
        return output
    }
    
}