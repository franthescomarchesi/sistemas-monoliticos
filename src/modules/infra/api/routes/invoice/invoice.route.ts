import express, { Request, Response } from "express"
import FindInvoiceUsecase from "../../../../invoice/usecase/find/find-invoice.usecase"
import InvoiceRepository from "../../../../invoice/repository/invoice.repository"

export const invoiceRoute = express.Router()

invoiceRoute.get("/:id", async (request: Request, response: Response) => {
    const usecase = new FindInvoiceUsecase(new InvoiceRepository())
    try {
        const input = {
            id: request.params.id
        }
        const output = await usecase.execute(input)
        response.send(output)
    } catch (err) {
        response.status(500).send(err)
    }
})