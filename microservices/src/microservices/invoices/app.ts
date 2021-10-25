import { HttpStatusCode } from "../../common/enums";
import expressWrapper from "../../common/express/wrapper";
import { CreateInvoiceInput } from "./models/inputs";
import invoiceService from "./services/invoiceService";

const serviceFactory = expressWrapper.factory();
serviceFactory.SetupMongoDataBase();

serviceFactory.ApiController("invoice",(http)=>{
    
    http.get("getAll",(req, res)=>{

        invoiceService.getAllInvoices().then((list)=>{
            res.status(HttpStatusCode.Ok);
            res.send(list);
        }).catch((ex)=>{
            console.log("get all invoices error, ",ex);
            res.status(HttpStatusCode.InternalServerError);
            res.send("Something wrong has happened")
        });
    })
    http.get("getById/:id",(req, res)=>{
        const id = req.params.id;

        invoiceService.getInvoiceById(id).then((result)=>{
            if(result== null)
            {
                res.status(HttpStatusCode.NotFound);
                res.send("Invoice Not Found");
                return;
            }
            res.status(HttpStatusCode.Ok);
            res.send(result);
        }).catch((ex)=>{
            console.log("get all invoices error, ",ex);
            res.status(HttpStatusCode.InternalServerError);
            res.send("Something wrong has happened")
        });
    })
    http.post<any,CreateInvoiceInput>("create",(req, res)=>{
        let invoice:CreateInvoiceInput = req.body;

        invoice.SubTotal = invoice.Detail.reduce((pre,next)=>(pre+next.SubTotal),0);
        invoice.Tax = invoice.Detail.reduce((pre,next)=>(pre+next.Tax),0);
        invoice.Total = invoice.Detail.reduce((pre,next)=>(pre+next.Total),0);

        if(invoice.Detail.length <=0)
        {
            res.status(HttpStatusCode.BadRequest);
            res.send("Invoice Detail is required")
            return;
        }
        
        invoiceService.createInvoice(invoice).then(saved=>{
            if(saved){
                res.status(HttpStatusCode.Created);
                res.send("Invoiced Created!!")
            }else{
                res.status(HttpStatusCode.BadRequest);
                res.send("Something was wrong creating invoice!!")
            }
        })
        .catch(e=>{
            console.log("create invoice error, ",e);
            res.status(HttpStatusCode.InternalServerError);
            res.send("Something wrong has happened creating invoices!!")
        });
    })
})

serviceFactory.StartUp(3001,service=>console.log(`${service} is running on por 3001`));
