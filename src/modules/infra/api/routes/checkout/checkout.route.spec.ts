import { app, sequelize } from "../../express"
import request from "supertest"

describe("E2E test for checkout", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a checkout", async () => {
        const inputClient = {
            name: "Name 01",
            document: "Document 01",
            email: "Email 01",
            street: "Street 01",
            number: "Number 01",
            complement: "Complement",
            city: "City 01",
            state: "State 01",
            zipCode: "ZipCode 01"
        }
        const responseClient = await request(app)
            .post("/client")
            .send(inputClient)
        const inputProduct01 = {
            name: "Name 01",
            description: "Description 01",
            purchasePrice: 100,
            stock: 10
        }
        const responseProduct01 = await request(app)
            .post("/product")
            .send(inputProduct01)
        const inputProduct02 = {
            name: "Name 02",
            description: "Description 02",
            purchasePrice: 200,
            stock: 20
        }
        const responseProduct02 = await request(app)
            .post("/product")
            .send(inputProduct02)
        const inputOrder = {
            clientId: responseClient.body.id,
            products: [{
                productId: responseProduct01.body.id
            }, {
                productId: responseProduct02.body.id
            }]
        }
        const responseCheckout = await request(app)
            .post("/checkout")
            .send(inputOrder)
        expect(responseCheckout.body.id).toBeDefined()
        expect(responseCheckout.body.status).toBe("approved")
        expect(responseCheckout.body.total).toBe(inputProduct01.purchasePrice + inputProduct02.purchasePrice)
        expect(responseCheckout.body.products.length).toBe(2)
        expect(responseCheckout.body.products[0].length).toBe(responseProduct01.body.id)
        expect(responseCheckout.body.products[1].length).toBe(responseProduct02.body.id)
    })

})