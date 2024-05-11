import express, { Request, Response } from "express"
import AddProductUsecase from "../../../../product-adm/usecase/add-product/add-product.usecase"
import ProductRepository from "../../../../product-adm/repository/product.repository"

export const productRoute = express.Router()

productRoute.post("/", async (request: Request, response: Response) => {
    const usecase = new AddProductUsecase(new ProductRepository())
    try {
        const input = {
            name: request.body.name,
            description: request.body.description,
            purchasePrice: request.body.purchasePrice,
            stock: request.body.stock
        }
        const output = await usecase.execute(input)
        response.send(output)
    } catch (err) {
        response.status(500).send(err)
    }
})