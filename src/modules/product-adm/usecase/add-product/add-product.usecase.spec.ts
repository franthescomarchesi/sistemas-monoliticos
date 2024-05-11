import AddProductUsecase from "./add-product.usecase"

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("Add product usecase unit test", () => {
    it("Should add a product", async () => {
        const productRepository = mockRepository()
        const addProductUsecase = new AddProductUsecase(productRepository)
        const input = {
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }
        const output = await addProductUsecase.execute(input)
        expect(productRepository.add).toHaveBeenCalled()
        expect(output.id).toBeDefined()
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)
    })
})