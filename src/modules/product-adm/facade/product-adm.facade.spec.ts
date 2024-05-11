import { Sequelize } from "sequelize-typescript"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductModel from "../repository/product.model"
import ProductRepository from "../repository/product.repository"
import AddProductUsecase from "../usecase/add-product/add-product.usecase"
import ProductAdmFacade from "./product-adm.facade"

describe("ProductAdmFacade test", () => {
    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory:",
           logging: false,
           sync: { force: true } 
        })
        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    }) 

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should create a product", async () => {
        
        const productRepository = new ProductRepository()
        const addProductUsecase = new AddProductUsecase(productRepository)
        const productFacade = new ProductAdmFacade({
            addProductUsecase,
            checkStockUsecase: null
        })

        const input = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        productFacade.addProduct(input)

        const output = await ProductModel.findOne({
            where: {
                id: input.id
            }
        })

        expect(output.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)

    })
})