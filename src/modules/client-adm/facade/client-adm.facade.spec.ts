import { Sequelize } from "sequelize-typescript"
import ClientModel from "../repository/client.model"
import ClientRepository from "../repository/client.repository"
import AddClientUsecase from "../usecase/add-client/add-client.usecase"
import ClientAdmFacade from "./client-adm.facade"
import FindClientUsecase from "../usecase/find-client/find-client.usecase"
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory"

describe("ClientAdmFacade test", () => {

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
            id: "1",
            name: "Client 01",
            document: "Document 01",
            email: "Email 01",
            street: "Street 01",
            number: "Number 01",
            complement: "Complement 01",
            city: "City 01",
            state: "State 01",
            zipCode: "ZipCode 01"
        }
        const repository = new ClientRepository()
        const usecase = new AddClientUsecase(repository)
        const facade = new ClientAdmFacade({
            addUsecase: usecase,
            findUsecase: null
        })
        await facade.add(input)
        const output = await ClientModel.findOne({
            where: {
                id: input.id
            }
        })
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.email).toBe(input.email)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.createdAt).toBeDefined()
        expect(output.updatedAt).toBeDefined()
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
        const usecase = new FindClientUsecase(repository)
        const facade = new ClientAdmFacade({
            addUsecase: null,
            findUsecase: usecase
        })
        const output = await facade.find({
            id: input.id
        })
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
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
        const facade = ClientAdmFacadeFactory.create()
        const output = await facade.find({
            id: input.id
        })
        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
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