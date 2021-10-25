import express,{Express}from 'express';
import bodyParse  from 'body-parser';
import mongoContext,{defaultDataBase} from '../../database/dbContext'
import HttpRequestVerbs from './httpRequestVerbs'

const _host:string = "localhost";
const _port:number = 27017;

class ExpressWrapper {
    private appService:Express;
    private baseUrl:string;

    constructor(){
        this.appService = express();
        this.appService.use(bodyParse.json());
        this.baseUrl = "";
    }
    SetupMongoDataBase = (databaseName:string = defaultDataBase, host:string = _host, port:number = _port)=>{
        mongoContext.connect(databaseName,host, port)
                    .then(rs=>console.log(rs)).catch(console.error);
    }
    
    ApiController = (controllerName:string, callback= (requestVerbs:HttpRequestVerbs):void=>{})=>{
        this.baseUrl = controllerName;
        const requestWrapper = new HttpRequestVerbs(controllerName, this.appService);
       
        callback(requestWrapper);
    }

    StartUp = (port:number, logCallback = (controller:string)=>{})=>{
        this.appService.listen(port,()=>logCallback(this.baseUrl));
    }
    _getExpressInstance = ():Express=> this.appService;
}

export default {
    factory:():ExpressWrapper=>new ExpressWrapper()
}
//export default new ExpressServiceFactory();