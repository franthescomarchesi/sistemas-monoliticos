import { Umzug } from "umzug"
import { app, sequelize } from "../../express"
import request from "supertest"
import { migrator } from "../../../../../test-migrations/config-migrations/migrator"

describe("E2E test for product", () => {

    let migration: Umzug<any>

    beforeEach(async () => {
        migration = migrator(sequelize)
        await migration.up()
    })

    afterAll(async () => {
        migration = migrator(sequelize)
        await migration.down()
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