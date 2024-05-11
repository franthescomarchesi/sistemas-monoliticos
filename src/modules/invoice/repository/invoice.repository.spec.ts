import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "./invoice.model"
import InvoiceItemsModel from "./invoice-items.model"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import InvoiceItem from "../domain/invoice-items"
import Invoice from "../domain/invoice"
import InvoiceRepository from "./invoice.repository"

describe("Invoice repository test", () => {

    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory:",
           logging: false,
           sync: { force: true } 
        })
        await sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    }) 

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should create a invoice", async () => {
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
        const invoiceRepository = new InvoiceRepository()
        const output = await invoiceRepository.create(invoice)
        expect(output.id.id).toBe(invoice.id.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.street).toBe(invoice.address.street)
        expect(output.address.number).toBe(invoice.address.number)
        expect(output.address.complement).toBe(invoice.address.complement)
        expect(output.address.city).toBe(invoice.address.city)
        expect(output.address.state).toBe(invoice.address.state)
        expect(output.address.zipCode).toBe(invoice.address.zipCode)
        expect(output.items.length).toBe(invoice.items.length)
        expect(output.items[0].id.id).toBe(invoice.items[0].id.id)
        expect(output.items[0].name).toBe(invoice.items[0].name)
        expect(output.items[0].price).toBe(invoice.items[0].price)
        expect(output.items[1].id.id).toBe(invoice.items[1].id.id)
        expect(output.items[1].name).toBe(invoice.items[1].name)
        expect(output.items[1].price).toBe(invoice.items[1].price)
        expect(output.total).toBe(invoice.items[0].price + invoice.items[1].price)
        expect(output.createdAt).toBe(invoice.createdAt)
        expect(output.updatedAt).toBe(invoice.updatedAt)
    })

    it("Should find a invoice", async () => {
        const invoice = {
            id: "01",
            name: "Name 01",
            document: "Document 01",
            street: "Street 01",
            number: "Number 01",
            complement: "Complement 01",
            city: "City 01",
            state: "State 01",
            zipCode: "ZipCode 01",
            items: [{
                id: "01",
                name: "Name 01",
                price: 100
            }, {
                id: "02",
                name: "Name 02",
                price: 200
            }],
            total: 300,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await InvoiceModel.create(invoice, {
            include: [{model: InvoiceItemsModel}]
        })
        const invoiceRepository = new InvoiceRepository()
        const output = await invoiceRepository.find(invoice.id)
        expect(output.id.id).toBe(invoice.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.street).toBe(invoice.street)
        expect(output.address.number).toBe(invoice.number)
        expect(output.address.complement).toBe(invoice.complement)
        expect(output.address.city).toBe(invoice.city)
        expect(output.address.state).toBe(invoice.state)
        expect(output.address.zipCode).toBe(invoice.zipCode)
        expect(output.items.length).toBe(invoice.items.length)
        expect(output.items[0].id.id).toBe(invoice.items[0].id)
        expect(output.items[0].name).toBe(invoice.items[0].name)
        expect(output.items[0].price).toBe(invoice.items[0].price)
        expect(output.items[1].id.id).toBe(invoice.items[1].id)
        expect(output.items[1].name).toBe(invoice.items[1].name)
        expect(output.items[1].price).toBe(invoice.items[1].price)
        expect(output.total).toBe(invoice.total)
        expect(output.createdAt).toEqual(invoice.createdAt)
        expect(output.updatedAt).toEqual(invoice.updatedAt)
    })

})