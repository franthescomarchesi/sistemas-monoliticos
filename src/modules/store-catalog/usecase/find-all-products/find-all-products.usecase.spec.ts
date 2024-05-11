import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all-products.usecase";

const input = {
    id: new Id("1"),
    name: "Product 01",
    description: "Product 01 description",
    salesPrice: 100
}

const product = new Product(input)

const input2 = {
    id: new Id("2"),
    name: "Product 02",
    description: "Product 02 description",
    salesPrice: 200
}

const product2 = new Product(input2)

const mockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        find: jest.fn()
    }
}

describe("FindAll usecase unit test", () => {
    it("Should find all products", async () => {
        const productRepository = mockRepository()
        const findAllUsecase = new FindAllProductsUsecase(productRepository)
        const output = await findAllUsecase.execute()
        const [outputProduct, outputProduct2] = output.products
        expect(productRepository.findAll).toHaveBeenCalled()
        expect(output.products.length).toBe(2)
        expect(outputProduct.id).toBe(input.id.id)
        expect(outputProduct.name).toBe(input.name)
        expect(outputProduct.description).toBe(input.description)
        expect(outputProduct.salesPrice).toBe(input.salesPrice)
        expect(outputProduct2.id).toBe(input2.id.id)
        expect(outputProduct2.name).toBe(input2.name)
        expect(outputProduct2.description).toBe(input2.description)
        expect(outputProduct2.salesPrice).toBe(input2.salesPrice)
    })
})