import { triggerAsyncId } from "async_hooks";
import mongoose,{Schema} from "mongoose";
import { Customers, Invoice, InvoiceDetail, Products} from "./collectionTypes";

export const defaultDataBase = "microservice";

export const CustomerSchema = new Schema<Customers>({
    CustomerId: {type:Schema.Types.ObjectId, required: true},
    Name: {type:String, required: true},
    LastName: {type:String, required: true},
    Email: {type:String, required: true},
    Phone: {type:String, required: false},
    Address:[{type:String}]
});

export const InvoiceSchema = new Schema<Invoice>({
    InvoiceId:{ type:Schema.Types.ObjectId, required: true},
    CustomerId:{ required: true, type: 'ObjectId', ref:"Customers"},
    SubTotal: {type:Number, required: true},
    InvoiceDetail:[{type: 'ObjectId', ref:"InvoiceDetail", require:true}],
    Total: {type:Number, required: true},
    _customer: {type: 'ObjectId', ref:"Customers"}
});

export const InvoiceDetailSchema = new Schema<InvoiceDetail>({
    ProductId: { required: true, type: 'ObjectId', ref:"Products"},
    ItemCount: {type:Number, require:true},
    Price: {type:Number, require:true},
    SubTotal: {type:Number, require:true},
    Tax: {type:Number, require:true},
    Total: {type:Number, require:true}
});

//ProductsItems:[{ required: true, type: 'ObjectId', ref:"Products"}],
export const ProductsSchema = new Schema<Products>({
    ProductId: {type:Schema.Types.ObjectId, required: true},
    Name: {type:String, required: true},
    ExpirationDate:{type:Date, required: false},
    Price:{type:Number, required: true},
    SerieNumber:{type:String, required: false}
});

export default {
    connect: async (database:string, host:string, port:number = 27017):Promise<void>=>{
        const mongoUrl = `mongodb://${host}:${port}/${database}`;
        await mongoose.connect(mongoUrl)
    }
}