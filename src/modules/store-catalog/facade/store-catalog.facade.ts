import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface"
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDTO, FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO } from "./store-catalog.facade.interface"

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findProductUsecase: UsecaseInterface 
    private _findAllProductsUsecase: UsecaseInterface 

    constructor(usecasesProps: UsecasesProps) {
        this._findProductUsecase = usecasesProps.findProductUsecase
        this._findAllProductsUsecase = usecasesProps.findAllProductsUsecase
    }

    async find(input: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
        return await this._findProductUsecase.execute(input)
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
        return await this._findAllProductsUsecase.execute({})
    }

}

export interface UsecasesProps {
    findAllProductsUsecase: UsecaseInterface
    findProductUsecase: UsecaseInterface
}