import { Sequelize } from "sequelize-typescript"
import ClientModel from "./client.model"
import OrderModel from "./order.model"
import ProductModel from "./product.model"
import Product from "../domain/product.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Client from "../domain/client.entity"
import Order from "../domain/order.entity"
import CheckoutRepository from "./checkout.repository"

describe("CheckoutRepository test", () => {

    let sequelize: Sequelize

    beforeEach( async () => {
        sequelize = new Sequelize({
           dialect: "sqlite",
           storage: ":memory:",
           logging: false,
           sync: { force: true } 
        })
        await sequelize.addModels([ClientModel, ProductModel, OrderModel])
        await sequelize.sync()
    }) 

    afterEach(async () => {
        await sequelize.close()
    })

    it("Should create an order", async () => {
        const clientProps = {
            id: new Id("1c"),
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "Some address",
            number: "1",
            complement: "",
            city: "Some city",
            state: "Some state",
            zipCode: "000"
        }
        const client = new Client(clientProps)
        const productsProps = [{
            id: new Id("1"),
            name: "Product 1",
            description: "Some description",
            salesPrice: 40
        }, {
            id: new Id("2"),
            name: "Product 2",
            description: "Some description",
            salesPrice: 30
        }]
        const products = productsProps.map(productProps => {
            return new Product(productProps)
        })
        const orderProps = {
            client,
            products
        }
        const order = new Order(orderProps)
        const repository = new CheckoutRepository()
        await repository.addOrder(order)
        const outputProducts = await ProductModel.findAll({
            where: {
                orderId: order.id.id
            }
        })
        const outputOrder = await OrderModel.findOne({
            where: {
                id: order.id.id
            }
        })
        const outputClient = await ClientModel.findOne({
            where: {
                id: order.client.id.id
            }
        })
        expect(outputOrder.id).toBe(order.id.id)
        expect(outputClient.id).toBe(clientProps.id.id)
        expect(outputClient.name).toBe(clientProps.name)
        expect(outputClient.document).toBe(clientProps.document)
        expect(outputClient.email).toBe(clientProps.email)
        expect(outputClient.street).toBe(clientProps.street)
        expect(outputClient.number).toBe(clientProps.number)
        expect(outputClient.complement).toBe(clientProps.complement)
        expect(outputClient.city).toBe(clientProps.city)
        expect(outputClient.state).toBe(clientProps.state)
        expect(outputClient.zipCode).toBe(clientProps.zipCode)
        expect(outputProducts.length).toBe(productsProps.length)
        expect(outputProducts[0].id).toBe(productsProps[0].id.id)
        expect(outputProducts[0].name).toBe(productsProps[0].name)
        expect(outputProducts[0].description).toBe(productsProps[0].description)
        expect(outputProducts[0].salesPrice).toBe(productsProps[0].salesPrice)
        expect(outputProducts[1].id).toBe(productsProps[1].id.id)
        expect(outputProducts[1].name).toBe(productsProps[1].name)
        expect(outputProducts[1].description).toBe(productsProps[1].description)
        expect(outputProducts[1].salesPrice).toBe(productsProps[1].salesPrice)
        expect(outputOrder.status).toBe(order.status)
    })

    it("Should find an order", async () => {
        const clientProps = {
            id: "1c",
            name: "Client 0",
            document: "0000",
            email: "client@user.com",
            street: "Some address",
            number: "1",
            complement: "",
            city: "Some city",
            state: "Some state",
            zipCode: "000"
        }
        const productsProps = [{
            id: "1p",
            name: "Product 1",
            description: "Some description",
            salesPrice: 40
        }, {
            id: "2p",
            name: "Product 2",
            description: "Some description",
            salesPrice: 30
        }]
        const orderProps = {
            id: "1o",
            client: clientProps,
            products: productsProps,
            status: "approved"
        }
        await OrderModel.create(orderProps, {
            include: [ {model: ClientModel}, {model: ProductModel} ]
        })
        const repository = new CheckoutRepository()
        const output = await repository.findOrder("1o")
        expect(output.id.id).toBe(orderProps.id)
        expect(output.client.id.id).toBe(clientProps.id)
        expect(output.client.name).toBe(clientProps.name)
        expect(output.client.document).toBe(clientProps.document)
        expect(output.client.email).toBe(clientProps.email)
        expect(output.client.street).toBe(clientProps.street)
        expect(output.client.number).toBe(clientProps.number)
        expect(output.client.complement).toBe(clientProps.complement)
        expect(output.client.city).toBe(clientProps.city)
        expect(output.client.state).toBe(clientProps.state)
        expect(output.client.zipCode).toBe(clientProps.zipCode)
        expect(output.products.length).toBe(productsProps.length)
        expect(output.products[0].id.id).toBe(productsProps[0].id)
        expect(output.products[0].name).toBe(productsProps[0].name)
        expect(output.products[0].description).toBe(productsProps[0].description)
        expect(output.products[0].salesPrice).toBe(productsProps[0].salesPrice)
        expect(output.products[1].id.id).toBe(productsProps[1].id)
        expect(output.products[1].name).toBe(productsProps[1].name)
        expect(output.products[1].description).toBe(productsProps[1].description)
        expect(output.products[1].salesPrice).toBe(productsProps[1].salesPrice)
        expect(output.status).toBe(orderProps.status)
    })

})