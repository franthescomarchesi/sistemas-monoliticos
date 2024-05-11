import { app, sequelize } from "../../express"
import request from "supertest"

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a product", async () => {
        const input = {
            name: "Name 01",
            description: "Description 01",
            purchasePrice: 100,
            stock: 10
        }
        const response = await request(app)
            .post("/product")
            .send(input)
        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(input.name)
        expect(response.body.description).toBe(input.description)
        expect(response.body.purchasePrice).toBe(input.purchasePrice)
        expect(response.body.stock).toBe(input.stock)
    })

})