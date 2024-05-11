import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice-items";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemsModel from "./invoice-items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async create(input: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            items: input.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            }),
            total: input.total,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        },
        {
            include: [{model: InvoiceItemsModel}]
        })
        return input
    }
    async find(input: string): Promise<Invoice> {
        const outputItens = await InvoiceItemsModel.findAll({
            where: {
                invoiceId: input
            }
        })
        const output = await InvoiceModel.findOne({
            where: {
                id: input
            }
        })
        const inputInvoice = {
            id: new Id(output.id),
            name: output.name,
            document: output.document,
            address: new Address({
                street: output.street,
                number: output.number,
                complement: output.complement,
                city: output.city,
                state: output.state,
                zipCode: output.zipCode
            }),
            items: outputItens.map(item => {
                const inputItem = {
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price
                }
                return new InvoiceItem(inputItem)
            }),
            createdAt: output.createdAt,
            updatedAt: output.updatedAt
        }
        const invoice = new Invoice(inputInvoice)
        return invoice
    }
    
}