export interface CreateProductInput{
    ProductoName:string,
    SerieNumber:string,
    Price:number,
    ExpirationDate: Date
}

export interface UpdateProductInput{
    ProductoId:string,
    ProductoName:string,
    SerieNumber:string,
    Price:number,
    ExpirationDate: Date
}