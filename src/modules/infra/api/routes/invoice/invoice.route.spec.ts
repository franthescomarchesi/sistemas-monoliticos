import InvoiceItemsModel from "../../../../invoice/repository/invoice-items.model"
import InvoiceModel from "../../../../invoice/repository/invoice.model"
import { app, sequelize } from "../../express"
import request from "supertest"

describe("E2E test for invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
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
        const response = await request(app)
            .get("/invoice/01")
        expect(response.status).toBe(200)
        expect(response.body.id).toBe(invoice.id)
        expect(response.body.name).toBe(invoice.name)
        expect(response.body.document).toBe(invoice.document)
        expect(response.body.address.street).toBe(invoice.street)
        expect(response.body.address.number).toBe(invoice.number)
        expect(response.body.address.complement).toBe(invoice.complement)
        expect(response.body.address.city).toBe(invoice.city)
        expect(response.body.address.state).toBe(invoice.state)
        expect(response.body.address.zipCode).toBe(invoice.zipCode)
        expect(response.body.items.length).toBe(invoice.items.length)
        expect(response.body.items[0].id).toBe(invoice.items[0].id)
        expect(response.body.items[0].name).toBe(invoice.items[0].name)
        expect(response.body.items[0].price).toBe(invoice.items[0].price)
        expect(response.body.items[1].id).toBe(invoice.items[1].id)
        expect(response.body.items[1].name).toBe(invoice.items[1].name)
        expect(response.body.items[1].price).toBe(invoice.items[1].price)
        expect(response.body.total).toBe(invoice.total)
        expect(new Date(response.body.createdAt)).toEqual(invoice.createdAt)
    })

})