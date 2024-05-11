import UsecaseInterface from "../../@shared/domain/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findInvoiceUsecase: UsecaseInterface
    private _generateInvoiceUsecase: UsecaseInterface

    constructor(props: UsecasesProps) {
        this._findInvoiceUsecase = props.findInvoiceUsecase
        this._generateInvoiceUsecase = props.generateInvoiceUsecase
    }

    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoiceUsecase.execute(input)
    }
    create(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoiceUsecase.execute(input)
    }
    
}

export interface UsecasesProps{
    findInvoiceUsecase: UsecaseInterface
    generateInvoiceUsecase: UsecaseInterface
}