import {Types} from 'mongoose'

import { CreateCustomerInput, UpdateCustomerAddressInput, UpdateCustomerInput } from '../models/inputs';
import { CustomerModelOutput } from '../models/outputs';
import BaseService from './base';

class CustomersServices extends BaseService {
    constructor(){ super()}

    getAllCustomers = async ():Promise<CustomerModelOutput[]>=>{
        const result = await this.CustomerModel.find();

        const list:CustomerModelOutput[] = result.map(customer=>({
            CustomerId: customer.CustomerId.toString(),
            Name: customer.Name,
            LastName: customer.LastName,
            Email: customer.Email,
            Phone: customer.Phone,
            Address: customer.Address,
        }))

        return list;
    }

    getCustomerById = async (customerId:string):Promise<CustomerModelOutput| null>=>{
        
        const customer = await this.CustomerModel.findOne({CustomerId:{$eq: customerId}});
        
        if(customer == null)
            return null;
        
            const output:CustomerModelOutput = {
            CustomerId: customer.CustomerId.toString(),
            Name: customer.Name,
            LastName: customer.LastName,
            Email: customer.Email,
            Phone: customer.Phone,
            Address: customer.Address,
        }
        return output;
    }

    createCustomer = async (customer:CreateCustomerInput):Promise<boolean>=>{
        const id = new Types.ObjectId();

        let newCustomer = new this.CustomerModel({
            CustomerId: id,
            Name: customer.Name,
            LastName: customer.LastName,
            Address: customer.Address,
            Email: customer.Email,
            Phone: customer.Phone
        });
        
        const result = await newCustomer.save().then(rs=>true).catch(e=>{
            console.log("error create customer ",e);
            return false;
        });
        
        return result;
    }

    updateCustomer = async (updateRequest: UpdateCustomerInput):Promise<boolean>=>{
        const id = new Types.ObjectId(updateRequest.CustomerId);
        const result = await this.CustomerModel.updateOne({CustomerId:id},{
            $set:{
                Name: updateRequest.Name,
                LastName: updateRequest.LastName,
                Email: updateRequest.Email,
                Phone: updateRequest.Phone
            }
        });

        return result.modifiedCount > 0;
    }
    updateCustomerAddress = async (updateRequest: UpdateCustomerAddressInput):Promise<boolean>=>{
        const id = new Types.ObjectId(updateRequest.CustomerId);
        const result = await this.CustomerModel.updateOne({CustomerId:id},{
            $set:{
                Address: updateRequest.Address
            }
        });

        return result.modifiedCount > 0;
    }

    removeCustomer = async (customerId:string):Promise<boolean>=>{
        const id = new Types.ObjectId(customerId);
        const result = await this.CustomerModel.deleteOne({CustomerId:{$eq: id}});
        return result.deletedCount > 0;
    }
}

export default new CustomersServices();