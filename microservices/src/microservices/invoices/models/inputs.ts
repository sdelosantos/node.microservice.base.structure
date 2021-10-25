type ItemInvoice ={
    ProductId:string,
    Count: number,
    Price: number,
    SubTotal: number,
    Tax:number,
    Total: number
}
export interface CreateInvoiceInput {
    CustomerId: string,
    Detail:ItemInvoice[],
    SubTotal: number,
    Tax:number,
    Total: number
}
