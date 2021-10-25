import { Types } from "mongoose";
import { CreateProductInput, UpdateProductInput } from "../models/inputs";
import { ProductOutput } from "../models/outputs";
import BaseService from "./base";

class ProductsService extends BaseService {
    constructor(){ super();}
    
    getAllProducts = async ():Promise<ProductOutput[]>=>{
        const list = await this.ProductoEntity.find({});
        
        const result:ProductOutput[] = list.map(pro=>({
            ExpirationDate: pro.ExpirationDate,
            ProductoId: pro.ProductId.toString(),
            ProductoName: pro.Name,
            SerieNumber: pro.SerieNumber
        }));

        return result;
    }

    getProductById = async (productId:string): Promise<ProductOutput | null>=>{
        const _product = await this.ProductoEntity.findById(productId);
        
        if(_product == null)
            return null;
        
        const result:ProductOutput = {
            ExpirationDate: _product.ExpirationDate,
            ProductoId: _product.ProductId.toString(),
            ProductoName: _product.Name,
            SerieNumber: _product.SerieNumber
        }

        return result;
    }

    createProduct = async (product:CreateProductInput):Promise<boolean>=>{
        const id = new Types.ObjectId();

        const newProduct = new this.ProductoEntity({
            ProductId: id,
            ExpirationDate: product.ExpirationDate,
            Name: product.ProductoName,
            Price:product.Price,
            SerieNumber: product.SerieNumber
        });
    
        const result = await newProduct.save().then(rs=>true).catch(e=>{
            console.log("error create customer ",e);
            return false;
        });
        
        return result;
    }

    updateProduct = async (product:UpdateProductInput)=>{
        const id = new Types.ObjectId(product.ProductoId);
        
        const result = await this.ProductoEntity.updateOne({ProductId:{$eq:id}},{
            Name: product.ProductoName,
            Price: product.Price,
            ExpirationDate: product.ExpirationDate,
            SerieNumber: product.SerieNumber
        })

        return result.modifiedCount > 0;
    }

    removeProduct = async (productId:string)=>{
        const id = new Types.ObjectId(productId);
       
        const result = await this.ProductoEntity.deleteOne({ProductId:{$eq:id}});
        return result.deletedCount >0;
    }
}

export default new ProductsService();