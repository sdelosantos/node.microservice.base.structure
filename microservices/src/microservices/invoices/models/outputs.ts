type ProductOutput = {
    ProductoId:string,
    ProductoName:string
}
export interface InvoiceModelOutput{
    InvoiceId: string,
    CustomerId: string,
    CustomerName: string,
    SelledItems:ProductOutput[]
    SubTotal: number,
    Tax: number,
    Total: number,
}
