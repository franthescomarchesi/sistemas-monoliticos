import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import AddProductUsecase from "../usecase/add-product/add-product.usecase"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import ProductRepository from "./product.repository"

describe("Product repository test", () => {

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

    it("Should add a product", async () => {

        const props = {
            id: new Id("1"),
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }
        const product = new Product(props)
        const productRepository = new ProductRepository()
        await productRepository.add(product)
        
        const output = await ProductModel.findOne({
            where: {
                id: props.id.id
            }
        })

        expect(output.id).toBe(props.id.id)
        expect(output.name).toBe(props.name)
        expect(output.description).toBe(props.description)
        expect(output.purchasePrice).toBe(props.purchasePrice)
        expect(output.stock).toBe(props.stock)

    })

    it("Should find a product", async () => {
 
        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
         }

        ProductModel.create(input)

        const productRepository = new ProductRepository()
        const output = await productRepository.find(input.id)

        expect(output.id.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.purchasePrice).toBe(input.purchasePrice)
        expect(output.stock).toBe(input.stock)

    })

})