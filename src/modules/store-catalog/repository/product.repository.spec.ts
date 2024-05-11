import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"

describe("ProductRepository test", () => {
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

    it("Should find all products", async () => {
    
        const input = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            salesPrice: 100
        }
        
        const input2 = {
            id: "2",
            name: "Product 02",
            description: "Product 02 description",
            salesPrice: 200
        }

        await ProductModel.create(input)
        await ProductModel.create(input2)

        const productRepository = new ProductRepository()
        const output = await productRepository.findAll()
        const [outputProduct, outputProduct2] = output

        expect(output.length).toBe(2)
        expect(outputProduct.id.id).toBe(input.id)
        expect(outputProduct.name).toBe(input.name)
        expect(outputProduct.description).toBe(input.description)
        expect(outputProduct.salesPrice).toBe(input.salesPrice)
        expect(outputProduct2.id.id).toBe(input2.id)
        expect(outputProduct2.name).toBe(input2.name)
        expect(outputProduct2.description).toBe(input2.description)
        expect(outputProduct2.salesPrice).toBe(input2.salesPrice)

    })

    it("Should find a product", async () => {
    
        const input = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            salesPrice: 100
        }

        await ProductModel.create(input)

        const productRepository = new ProductRepository()
        const output = await productRepository.find(input.id)

        expect(output.id.id).toBe(input.id)
        expect(output.name).toBe(input.name)
        expect(output.description).toBe(input.description)
        expect(output.salesPrice).toBe(input.salesPrice)

    })
})