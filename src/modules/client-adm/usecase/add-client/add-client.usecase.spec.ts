import AddClientUsecase from "./add-client.usecase"

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add client usecase unit test", () => {
    it("Should add a client", async () => {
        const repository = MockRepository()
        const usecase = new AddClientUsecase(repository)
        const input = {
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
        const output = await usecase.execute(input)
        expect(repository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.email).toBe(input.email)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
    })
})