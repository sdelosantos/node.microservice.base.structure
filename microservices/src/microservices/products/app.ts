import { HttpStatusCode } from "../../common/enums";
import expressWrapper from "../../common/express/wrapper";
import { CreateProductInput, UpdateProductInput } from "./models/inputs";
import productoService from "./services/productService";

const serviceFactory = expressWrapper.factory();
serviceFactory.SetupMongoDataBase();

serviceFactory.ApiController("products",(http)=>{
    
    http.get("getAll",(req, res)=>{
        productoService.getAllProducts().then((data)=>{
            res.send(data);
        });
    })
    
    http.post<any,CreateProductInput>("create",(req, res)=>{
        const product = req.body;

        productoService.createProduct(product).then((data)=>{
            if(data){
                res.status(HttpStatusCode.Created)
                res.send("Product Created !!");
            }else{
                res.status(HttpStatusCode.BadRequest)
                res.send("Something wrong ");
            }
        }).catch((e)=>{
            console.log("create product error", e);
            res.status(HttpStatusCode.InternalServerError)
            res.send("Somenthing wrong creating product");
        });
    })
     
    http.post<any,UpdateProductInput>("update",(req, res)=>{
        const product = req.body;

        productoService.updateProduct(product).then((data)=>{
            if(data){
                res.status(HttpStatusCode.Ok)
                res.send("Product Updated !!");
            }else{
                res.status(HttpStatusCode.BadRequest)
                res.send("Somenthing wrong updating product");
            }
        }).catch((e)=>{
            console.log("updating product error", e);
            res.status(HttpStatusCode.InternalServerError)
            res.send("Somenthing wrong updating product");
        });
    })
})

serviceFactory.StartUp(3002,(service)=>console.log(service+"service running on 3002"))
// export default { 
//     start: expressFactory.runService
// };