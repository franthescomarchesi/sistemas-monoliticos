import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUsecase from "./find-client.usecase"

const props = {
    id: new Id("1"),
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

const client = new Client(props)

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("Find client usecase unit test", () => {
    it("Should find a client", async () => {
        const repository = MockRepository()
        const usecase = new FindClientUsecase(repository)
        const input = {
            id: props.id.id
        }
        const output = await usecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(output.id).toBe(props.id.id)
        expect(output.name).toBe(props.name)
        expect(output.document).toBe(props.document)
        expect(output.email).toBe(props.email)
        expect(output.street).toBe(props.street)
        expect(output.number).toBe(props.number)
        expect(output.complement).toBe(props.complement)
        expect(output.city).toBe(props.city)
        expect(output.state).toBe(props.state)
        expect(output.zipCode).toBe(props.zipCode)
        expect(output.createdAt).toBe(client.createdAt)
        expect(output.updatedAt).toBe(client.updatedAt)
    })
})