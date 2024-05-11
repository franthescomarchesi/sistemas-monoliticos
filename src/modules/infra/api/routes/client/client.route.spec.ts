import { app, sequelize } from "../../express"
import request from "supertest"

describe("E2E test for client", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("Should create a client", async () => {
        const input = {
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
        const response = await request(app)
            .post("/client")
            .send(input)
        expect(response.status).toBe(200)
        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(input.name)
        expect(response.body.document).toBe(input.document)
        expect(response.body.email).toBe(input.email)
        expect(response.body.street).toBe(input.street)
        expect(response.body.number).toBe(input.number)
        expect(response.body.complement).toBe(input.complement)
        expect(response.body.city).toBe(input.city)
        expect(response.body.state).toBe(input.state)
        expect(response.body.zipCode).toBe(input.zipCode)
    })

})