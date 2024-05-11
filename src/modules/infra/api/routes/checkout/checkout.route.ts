import express, { Request, Response } from "express"
import PlaceOrderUsecase from "../../../../checkout/usecase/place-order/place-order.usecase"
import CheckoutRepository from "../../../../checkout/repository/checkout.repository"
import ClientAdmFacadeFactory from "../../../../client-adm/factory/client-adm.facade.factory"
import ProductAdmFacadeFactory from "../../../../product-adm/factory/facade.factory"
import StoreCatalogFacadeFactory from "../../../../store-catalog/factory/store-catalog.facade.factory"
import InvoiceFacadeFactory from "../../../../invoice/factory/invoice.facade.factory"
import PaymentFacadeFactory from "../../../../payment/factory/payment.facade.factory"

export const checkoutRoute = express.Router()

checkoutRoute.post("/", async (request: Request, response: Response) => {
    const usecase = new PlaceOrderUsecase(
        ClientAdmFacadeFactory.create(),
        ProductAdmFacadeFactory.create(),
        StoreCatalogFacadeFactory.create(),
        new CheckoutRepository(),
        InvoiceFacadeFactory.create(),
        PaymentFacadeFactory.create()
    )
    try {
        const input = {
            clientId: request.body.clientId,
            products: request.body.products
        }
        const output = await usecase.execute(input)
        response.send(output)
    } catch (err) {
        response.status(500).send(err)
    }
    
})