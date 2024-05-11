import Id from "../../../@shared/domain/value-object/id.value-object"
import Product from "../../domain/product.entity"
import CheckStockUsecase from "./check-stock.usecase"

const input = {
    id: new Id(),
    name: "Product 01",
    description: "Product 01 description",
    purchasePrice: 100,
    stock: 10
}

const product = new Product(input)

const mockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product))
    }
}

describe("CheckStock usecase unit test", () => {
    it("Should get stock of a product", async () => {
        const productRepository = mockRepository()
        const addProductUsecase = new CheckStockUsecase(productRepository)
        const input = {
            productId: product.id.id
        }
        const output = await addProductUsecase.execute(input)
        expect(productRepository.find).toHaveBeenCalled()
        expect(output.productId).toBe(product.id.id)
        expect(output.stock).toBe(product.stock)
    })
})