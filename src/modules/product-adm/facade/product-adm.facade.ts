import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import ProductAdmFacadaInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadaInterface {

    private _addProductUsecase: UsecaseInterface
    private _checkStockUsecase: UsecaseInterface

    constructor(usecasesProps: UsecasesProps) {
        this._addProductUsecase = usecasesProps.addProductUsecase
        this._checkStockUsecase = usecasesProps.checkStockUsecase
    }

    async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        this._addProductUsecase.execute(input)
    }

    checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
        return this._checkStockUsecase.execute(input)
    }
    
}

export interface UsecasesProps{
    addProductUsecase: UsecaseInterface
    checkStockUsecase: UsecaseInterface
}