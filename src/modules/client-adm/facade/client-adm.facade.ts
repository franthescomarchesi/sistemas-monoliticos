import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUsecase: UsecaseInterface
    private _findUsecase: UsecaseInterface

    constructor(props: UsecaseProps) {
        this._addUsecase = props.addUsecase
        this._findUsecase = props.findUsecase
    }   

    async add(input: AddClientFacadeInputDTO): Promise<void> {
        await this._addUsecase.execute(input)
    }

    async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
        return await this._findUsecase.execute(input)
    }
    
}

export interface UsecaseProps {
    addUsecase: UsecaseInterface
    findUsecase: UsecaseInterface
}