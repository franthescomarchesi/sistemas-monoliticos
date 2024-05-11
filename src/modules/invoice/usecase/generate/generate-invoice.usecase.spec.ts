import GenerateInvoiceUsecase from "./generate-invoice.usecase"

const mockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn()
    }
}

describe("Generate invoice unit test", () => {
    it("Should create a invoice", async () => {
        const invoiceRepository = mockRepository()
        const generateInvoiceUsecase = new GenerateInvoiceUsecase(invoiceRepository)
        const input = {
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
              name: "Item 01",
              price: 100
            }, {
              id: "02",
              name: "Item 02",
              price: 200
            }]
          }
        const output = await generateInvoiceUsecase.execute(input)
        expect(invoiceRepository.create).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.document).toBe(input.document)
        expect(output.street).toBe(input.street)
        expect(output.number).toBe(input.number)
        expect(output.complement).toBe(input.complement)
        expect(output.city).toBe(input.city)
        expect(output.state).toBe(input.state)
        expect(output.zipCode).toBe(input.zipCode)
        expect(output.items.length).toBe(input.items.length)
        expect(output.items[0].id).toBe(input.items[0].id)
        expect(output.items[0].name).toBe(input.items[0].name)
        expect(output.items[0].price).toBe(input.items[0].price)
        expect(output.items[1].id).toBe(input.items[1].id)
        expect(output.items[1].name).toBe(input.items[1].name)
        expect(output.items[1].price).toBe(input.items[1].price)
        expect(output.total).toBe(input.items[0].price + input.items[1].price)
    })

})