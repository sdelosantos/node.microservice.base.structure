import {Types} from "mongoose";


export interface Customers {
    CustomerId: Types.ObjectId,
    Name: string,
    LastName: string,
    Email: string,
    Phone: string,
    Address:string[]
}

export interface Invoice {
    InvoiceId: Types.ObjectId,
    CustomerId: Types.ObjectId,
    SubTotal: number,
    Tax: number,
    Total: number,
    InvoiceDetail:Types.ObjectId[],
    _customer: Types.ObjectId
}

export interface InvoiceDetail {
    ProductId: Types.ObjectId,
    ItemCount: number,
    Price: number,
    SubTotal: number,
    Tax: number,
    Total: number
}

export interface Products {
    ProductId: Types.ObjectId,
    Name: string,
    SerieNumber: string,
    Price: number,
    ExpirationDate:Date
}