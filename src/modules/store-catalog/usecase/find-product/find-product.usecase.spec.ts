import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./find-product.usecase";

const input = {
    id: new Id("1"),
    name: "Product 01",
    description: "Product 01 description",
    salesPrice: 100
}

const product = new Product(input)

const mockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("FindProduct usecase unit test", () => {
    it("Should find a product", async () => {
        const productRepository = mockRepository()
        const findAllUsecase = new FindProductUsecase(productRepository)
        const output = await findAllUsecase.execute(input.id)
        expect(productRepository.find).toHaveBeenCalled()
        expect(output.id).toBe(input.id.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.salesPrice).toBe(input.salesPrice)
    })
})