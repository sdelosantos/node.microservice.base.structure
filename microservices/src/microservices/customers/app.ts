import { HttpStatusCode } from "../../common/enums";
import wrapper from "../../common/express/wrapper";
import { CreateCustomerInput, UpdateCustomerAddressInput, UpdateCustomerInput } from "./models/inputs";
import { CustomerModelOutput } from "./models/outputs";
import customerDbService from "./services/customerService";

const serviceFactory = wrapper.factory();
serviceFactory.SetupMongoDataBase();

serviceFactory.ApiController("customers",(http)=>{
    // get all customers
    http.get("getAll",async (req, res)=>{
        const result = await customerDbService.getAllCustomers();

        res.json(result);
    })

    http.get("getById/:id",async (req, res)=>{
        const id:string = req.params.id as string;

        const result:CustomerModelOutput | null = await customerDbService.getCustomerById(id);
    
        if(result==null){
            res.status(HttpStatusCode.NotFound);
            res.send("Customer Not Found!!")
        }else{
            res.status(HttpStatusCode.Ok);
            res.json(result);
        }
    })

    http.post<any,CreateCustomerInput>("create",(req, res)=>{
        const request:CreateCustomerInput = req.body;

        customerDbService.createCustomer(request).then((saved)=>{
            if(saved){
                res.status(HttpStatusCode.Created);
                res.send("Customer Created!!");
            }else{
                res.status(HttpStatusCode.Conflict);
                res.send("Something was wrong!");
            }
        });
    })
    
    // update new customer
    http.put<any,UpdateCustomerInput>("update",(req, res)=>{
        const request:UpdateCustomerInput = req.body;

        if(!request.CustomerId){
            res.status(HttpStatusCode.BadRequest);
            res.send("Customer Id is not valid");
        }else{
            customerDbService.updateCustomer(request).then((saved)=>{
                if(saved){
                    res.status(HttpStatusCode.Ok);
                    res.send("Customer Updated!!");
                }else{
                    res.status(HttpStatusCode.Conflict);
                    res.send("Any data was updated");
                }
            }).catch(e=>{
                console.log(e)
                res.status(HttpStatusCode.InternalServerError);
                res.send("Something was wrong!");
            });
        }
    })
    
    http.put<any,UpdateCustomerAddressInput>("updateAddress",(req, res)=>{
        const request:UpdateCustomerAddressInput = req.body;

        if(!request.CustomerId){
            res.status(HttpStatusCode.BadRequest);
            res.send("Customer Id is not valid");
        }else{
            customerDbService.updateCustomerAddress(request).then((saved)=>{
                if(saved){
                    res.status(HttpStatusCode.Ok);
                    res.send("Address Updated!!");
                }else{
                    res.status(HttpStatusCode.Conflict);
                    res.send("Any data was updated");
                }
            }).catch(e=>{
                console.log(e)
                res.status(HttpStatusCode.InternalServerError);
                res.send("Something was wrong!");
            });
        }
    })
        // create new customer
    http.delete("delete/:id",(req, res)=>{
        const customerId = req.params.id as string;

        if(!customerId){
            res.status(HttpStatusCode.BadRequest);
            res.send("Customer Id is not valid");
        }else{
            customerDbService.removeCustomer(customerId).then((saved)=>{
                if(saved){
                    res.status(HttpStatusCode.Ok);
                    res.send("Customer Deleted!!");
                }else{
                    res.status(HttpStatusCode.Conflict);
                    res.send("Something was wrong!");
                }
            });
        }
    })
})

serviceFactory.StartUp(3000,(serviceName)=> console.log(`${serviceName} running on port: 3000`))
