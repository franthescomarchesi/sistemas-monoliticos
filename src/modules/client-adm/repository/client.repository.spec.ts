import { Sequelize } from "sequelize-typescript"
import ClientModel from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

describe("Client repository test", () => {

    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory:",
           logging: false,
           sync: { force: true } 
        })
        await sequelize.addModels([ClientModel])
        await sequelize.sync()
    }) 

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should create a client", async () => {
        const input = {
            id: new Id("1"),
            name: "Client 01",
            document: "Document 01",
            email: "Email 01",
            street: "Street 01",
            number: "Number 01",
            complement: "Complement 01",
            city: "City 01",
            state: "State 01",
            zipCode: "ZipCode 01",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const client = new Client(input)
        const repository = new ClientRepository()
        await repository.add(client)
        const output = await ClientModel.findOne({
            where: {
                id: input.id.id
            }
        })
        expect(output.id).toBe(input.id.id)
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.createdAt).toEqual(input.createdAt)
        expect(output.updatedAt).toEqual(input.updatedAt)
    })

    it("Should find a client", async () => {
        const input = {
            id: "1",
            name: "Client 01",
            document: "Document 01",
            email: "Email 01",
            street: "Street 01",
            number: "Number 01",
            complement: "Complement 01",
            city: "City 01",
            state: "State 01",
            zipCode: "ZipCode 01",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await ClientModel.create(input)
        const repository = new ClientRepository()
        const output = await repository.find(input.id)
        expect(output.id.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.email).toBe(input.email)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.createdAt).toEqual(input.createdAt)
        expect(output.updatedAt).toEqual(input.updatedAt)
    })

})