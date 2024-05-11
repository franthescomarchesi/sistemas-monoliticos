import { Sequelize } from "sequelize-typescript"
import InvoiceItemsModel from "../repository/invoice-items.model"
import InvoiceModel from "../repository/invoice.model"
import InvoiceFacadeFactory from "./invoice.facade.factory"

describe("InvoiceFacade test", () => {

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
        const invoice = {
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
        const invoiceFacade = InvoiceFacadeFactory.create()
        const output = await invoiceFacade.create(invoice)
        expect(output.id).toBeDefined()
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.street).toBe(invoice.street)
        expect(output.number).toBe(invoice.number)
        expect(output.complement).toBe(invoice.complement)
        expect(output.city).toBe(invoice.city)
        expect(output.state).toBe(invoice.state)
        expect(output.zipCode).toBe(invoice.zipCode)
        expect(output.items.length).toBe(invoice.items.length)
        expect(output.items[0].id).toBe(invoice.items[0].id)
        expect(output.items[0].name).toBe(invoice.items[0].name)
        expect(output.items[0].price).toBe(invoice.items[0].price)
        expect(output.items[1].id).toBe(invoice.items[1].id)
        expect(output.items[1].name).toBe(invoice.items[1].name)
        expect(output.items[1].price).toBe(invoice.items[1].price)
        expect(output.total).toBe(invoice.total)
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
        const invoiceFacade = InvoiceFacadeFactory.create()
        const output = await invoiceFacade.find({id: invoice.id})
        expect(output.id).toBe(invoice.id)
        expect(output.name).toBe(invoice.name)
        expect(output.document).toBe(invoice.document)
        expect(output.address.street).toBe(invoice.street)
        expect(output.address.number).toBe(invoice.number)
        expect(output.address.complement).toBe(invoice.complement)
        expect(output.address.city).toBe(invoice.city)
        expect(output.address.state).toBe(invoice.state)
        expect(output.address.zipCode).toBe(invoice.zipCode)
        expect(output.items.length).toBe(invoice.items.length)
        expect(output.items[0].id).toBe(invoice.items[0].id)
        expect(output.items[0].name).toBe(invoice.items[0].name)
        expect(output.items[0].price).toBe(invoice.items[0].price)
        expect(output.items[1].id).toBe(invoice.items[1].id)
        expect(output.items[1].name).toBe(invoice.items[1].name)
        expect(output.items[1].price).toBe(invoice.items[1].price)
        expect(output.total).toBe(invoice.total)
        expect(output.createdAt).toEqual(invoice.createdAt)
    })

})