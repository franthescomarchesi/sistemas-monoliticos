import UsecaseInterface from "../../../@shared/domain/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDTO, CheckStockOutputDTO } from "./check-stock.dto";

export default class CheckStockUsecase implements UsecaseInterface{

    private _productRepository: ProductGateway

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository
    }

    async execute(input: CheckStockInputDTO): Promise<CheckStockOutputDTO> {
        const output = await this._productRepository.find(input.productId)
        return {
            productId: output.id.id,
            stock: output.stock
        }
    }

}