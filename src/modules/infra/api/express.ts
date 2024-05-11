import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "../../invoice/repository/invoice.model"
import TransactionModel from "../../payment/repository/transaction.model"
import { productRoute } from "./routes/product/product.route"
import { clientRoute } from "./routes/client/client.route"
import { checkoutRoute } from "./routes/checkout/checkout.route"
import { invoiceRoute } from "./routes/invoice/invoice.route"
import InvoiceItemsModel from "../../invoice/repository/invoice-items.model"
import OrderModel from "../../checkout/repository/order.model"
import ClientAdmModel from "../../client-adm/repository/client.model"
import ClientCheckoutModel from "../../checkout/repository/client.model"
import ProductAdmModel from "../../product-adm/repository/product.model"
import ProductStoreCatalogModel from "../../store-catalog/repository/product.model"
import ProductCheckoutModel from "../../checkout/repository/product.model"


export const app: Express = express()
app.use(express.json())
app.use("/product", productRoute)
app.use("/client", clientRoute)
app.use("/checkout", checkoutRoute)
app.use("/invoice", invoiceRoute)

export let sequelize: Sequelize

async function setupDb() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false
     })
     sequelize.addModels([
        ClientAdmModel, 
        ClientCheckoutModel,
        InvoiceModel, 
        InvoiceItemsModel, 
        TransactionModel, 
        ProductAdmModel, 
        ProductStoreCatalogModel,
        ProductCheckoutModel,
        OrderModel
    ])
    await sequelize.sync()
}

setupDb()