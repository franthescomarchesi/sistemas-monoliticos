import express, { Request, Response } from "express"
import AddClientUsecase from "../../../../client-adm/usecase/add-client/add-client.usecase"
import ClientRepository from "../../../../client-adm/repository/client.repository"

export const clientRoute = express.Router()

clientRoute.post("/", async (request: Request, response: Response) => {
    const facade = new AddClientUsecase(new ClientRepository())
    try {
        const clientDTO = {
            name: request.body.name,
            document: request.body.document,
            email: request.body.email,
            street: request.body.street,
            number: request.body.number,
            complement: request.body.complement,
            city: request.body.city,
            state: request.body.state,
            zipCode: request.body.zipCode
        }
        const output = await facade.execute(clientDTO)
        response.send(output)
    } catch(err) {
        response.status(500).send(err)
    }
})