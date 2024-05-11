import { CreatedAt, UpdatedAt } from "sequelize-typescript";
import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";

export default class AddClientUsecase implements UsecaseInterface {
    
    constructor(private repository: ClientGateway) {}

    async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            document: input.document,
            email: input.email,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        }
        const client = new Client(props)
        await this.repository.add(client)
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