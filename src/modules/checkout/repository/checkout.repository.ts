import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientCheckoutModel from "./client.model";
import OrderModel from "./order.model";
import ProductCheckoutModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {
        const clientProps = {
            id: order.client.id.id,
            name: order.client.name,
            document: order.client.document,
            email: order.client.email,
            street: order.client.street,
            number: order.client.number,
            complement: order.client.complement,
            city: order.client.city,
            state: order.client.state,
            zipCode: order.client.zipCode
        }
        const productsProps = order.products.map(product => {
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }
        })
        const orderProps = {
            id: order.id.id,
            client: clientProps,
            products: productsProps,
            status: order.status
        }
        await OrderModel.create(orderProps, {
            include: [ {model: ClientCheckoutModel}, {model: ProductCheckoutModel} ]
        })
    }

    async findOrder(id: string): Promise<Order> {
        const outputProducts = await ProductCheckoutModel.findAll({
            where: {
                orderId: id
            }
        })
        const outputOrder = await OrderModel.findOne({
            where: {
                id
            }
        })
        const outputClient = await ClientCheckoutModel.findOne({
            where: {
                id: outputOrder.clientId
            }
        })
        const client = new Client({
            id: new Id(outputClient.id),
            name: outputClient.name,
            document: outputClient.document,
            email: outputClient.email,
            street: outputClient.street,
            number: outputClient.number,
            complement: outputClient.complement,
            city: outputClient.city,
            state: outputClient.state,
            zipCode: outputClient.zipCode
        })
        const products = outputProducts.map(product => {
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })
        })
        const orderProps = {
            id: new Id(outputOrder.id),
            client,
            products,
            status: outputOrder.status
        }
        const order = new Order(orderProps)
        return order
    }
    
}