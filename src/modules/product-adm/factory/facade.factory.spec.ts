import { Sequelize } from "sequelize-typescript"
import ProductModel from "../repository/product.model"
import ProductAdmFacadeFactory from "./facade.factory"

describe("ProductAdmFacadeFactory test", () => {

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
        const productFacade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        await productFacade.addProduct(input)

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

    it("Should check product stock", async () => {
        const productFacade = ProductAdmFacadeFactory.create()

        const input = {
            id: "1",
            name: "Product 01",
            description: "Product 01 description",
            purchasePrice: 100,
            stock: 10
        }

        await productFacade.addProduct(input)

        const output = await productFacade.checkStock({
            productId: input.id
        })

        expect(output.productId).toBe(input.id)
        expect(output.stock).toBe(input.stock)

    })
    
})