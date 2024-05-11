import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import InvoiceItem from "../../domain/invoice-items"
import FindInvoiceUsecase from "./find-invoice.usecase"

const inputInvoice = {
    id: new Id("01"),
    name: "Name 01",
    document: "Document 01",
    address: new Address({
        street: "Street 01",
        number: "Number 01",
        complement: "Complement 01",
        city: "City 01",
        state: "State 01",
        zipCode: "ZipCode 01"
    }),
    items: [new InvoiceItem({
      id: new Id("01"),
      name: "Item 01",
      price: 100
    }), new InvoiceItem({
      id: new Id("02"),
      name: "Item 02",
      price: 200
    })]
}

const invoice = new Invoice(inputInvoice)

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Generate invoice unit test", () => {
    it("Should find a invoice", async () => {
        const invoiceRepository = mockRepository()
        const generateInvoiceUsecase = new FindInvoiceUsecase(invoiceRepository)
        const input = {
            id: inputInvoice.id.id
        }
        const output = await generateInvoiceUsecase.execute(input)
        expect(invoiceRepository.find).toHaveBeenCalled()
        expect(output.id).toBe(invoice.id.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.street).toBe(invoice.address.street)
        expect(output.address.number).toBe(invoice.address.number)
        expect(output.address.complement).toBe(invoice.address.complement)
        expect(output.address.city).toBe(invoice.address.city)
        expect(output.address.state).toBe(invoice.address.state)
        expect(output.address.zipCode).toBe(invoice.address.zipCode)
        expect(output.items.length).toBe(invoice.items.length)
        expect(output.items[0].id).toBe(invoice.items[0].id.id)
        expect(output.items[0].name).toBe(invoice.items[0].name)
        expect(output.items[0].price).toBe(invoice.items[0].price)
        expect(output.items[1].id).toBe(invoice.items[1].id.id)
        expect(output.items[1].name).toBe(invoice.items[1].name)
        expect(output.items[1].price).toBe(invoice.items[1].price)
        expect(output.total).toBe(invoice.items[0].price + invoice.items[1].price)
    })

})