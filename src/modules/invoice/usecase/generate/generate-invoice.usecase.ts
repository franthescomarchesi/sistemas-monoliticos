import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice";
import InvoiceItem from "../../domain/invoice-items";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUsecaseInputDto, GenerateInvoiceUsecaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UsecaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) {}

    async execute(input: GenerateInvoiceUsecaseInputDto): Promise<GenerateInvoiceUsecaseOutputDto> {
        const inputInvoice = {
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode
            }),
            items: input.items.map(item => {
                const inputItem = {
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                }
                return new InvoiceItem(inputItem)
            })
        }
        const invoice = new Invoice(inputInvoice)
        await this.invoiceRepository.create(invoice)
        const output = {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.total
        }
        return output
    }
    
}