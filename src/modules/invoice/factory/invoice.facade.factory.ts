import InvoiceFacade from "../facade/invoice.facade";
import InvoiceFacadeInterface from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create(): InvoiceFacadeInterface {
        const invoiceRepository = new InvoiceRepository()
        const findInvoiceUsecase = new FindInvoiceUsecase(invoiceRepository)
        const generateInvoiceUsecase = new GenerateInvoiceUsecase(invoiceRepository)
        const invoiceFacade = new InvoiceFacade({
            findInvoiceUsecase,
            generateInvoiceUsecase
        })
        return invoiceFacade
    }
}