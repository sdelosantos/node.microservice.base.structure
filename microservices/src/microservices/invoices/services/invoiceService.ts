import {Types}from 'mongoose';
import {InvoiceDetail} from '../../../database/collectionTypes'
import { InvoiceModelOutput } from '../models/outputs';
import { CreateInvoiceInput } from '../models/inputs';
import BaseService from './base';

class InvoiceService extends BaseService {
    constructor(){super()}

    getAllInvoices = async ():Promise<InvoiceModelOutput[]>=>{
        const list = await this.InvoiceEntity.find();

        const result:InvoiceModelOutput[] = list.map(invoice=>({
            CustomerId:invoice.CustomerId.toString(),
            CustomerName: "",
            InvoiceId: invoice.InvoiceId.toString(),
            SelledItems:[],
            SubTotal: invoice.SubTotal,
            Tax: invoice.Tax,
            Total: invoice.Total
        }))

        return result;
    }

    getInvoiceById = async (invoiceId:string):Promise<InvoiceModelOutput | null>=>{
        const id = new Types.ObjectId(invoiceId);

        const invoice = await this.InvoiceEntity.findOne({
            InvoiceId:{$eq:id}
        });

        console.log({invoice})
        if(invoice ==null) return null;

        const result:InvoiceModelOutput | null = {
            CustomerId:invoice.CustomerId.toString(),
            CustomerName: "",
            InvoiceId: invoice.InvoiceId.toString(),
            SelledItems: !invoice.InvoiceDetail ? [] : invoice.InvoiceDetail.map(det=>({
                ProductoId: det.toString(),
                ProductoName:"Producto 1"
            })),
            SubTotal: invoice.SubTotal,
            Tax: invoice.Tax,
            Total: invoice.Total
        }

        return result;
    }

    createInvoice = async (invoice:CreateInvoiceInput):Promise<boolean>=>{
        const id = new Types.ObjectId();

        const detail:InvoiceDetail[] = invoice.Detail.map(dt=>({
            ProductId: new Types.ObjectId(dt.ProductId),
            ItemCount: dt.Count,
            Price: dt.Price,
            SubTotal: dt.SubTotal,
            Tax: dt.Tax,
            Total: dt.Total
        }))

        const _invoice = new this.InvoiceEntity({
            InvoiceId: id,
            CustomerId: new Types.ObjectId(invoice.CustomerId),
            SubTotal:invoice.SubTotal,
            InvoiceDetail: detail.map(rs=>rs.ProductId),
            Tax: invoice.Tax,
            Total: invoice.Total
        })

        const result = await _invoice.save().then(rs=>true).catch(e=>{
            console.log("error create customer ",e);
            return false;
        });
        
        return result;
    }
        
}

export default new InvoiceService();