import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface"
import ClientGateway from "../../gateway/client.gateway"
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.usecase.dto"

export default class FindClientUsecase implements UsecaseInterface {
    
    constructor(private repository: ClientGateway) {}

    async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
        const client = await this.repository.find(input.id)
        const output = {
            id: client.id.id,
            name: client.name,
            document: client.document,
            email: client.email,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
        return output
    }
}