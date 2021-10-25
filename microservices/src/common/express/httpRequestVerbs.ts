import {Express, Request, Response} from 'express'
import bodyParse  from 'body-parser';
const urlencodedParser = bodyParse.urlencoded({ extended: false })

export default class HttpRequestVerbs{
    baseUrl:string;
    appService: Express;

    constructor(base:string, _appService: Express){
        this.baseUrl = base
        this.appService = _appService;
    }
    private getUrl(url:string){ return `/${this.baseUrl}/${url}`};

    post<TParamsType, TBodyType>(path:string, callback=(req:Request<TParamsType | any,{},TBodyType | any>,res:Response)=>{}){
        const url = this.getUrl(path);
        this.appService.post(url,urlencodedParser,callback)
    }
  
    get<TParamsType>(path:string, callback=(req:Request<TParamsType | any,{},any>, res:Response)=>{}){
        const url = this.getUrl(path);
        console.log("http get", url)
        this.appService.get(url,callback)
    }
    delete<TParamsType, TBodyType>(path:string, callback=(req:Request<TParamsType | any,{},TBodyType | any>, res:Response)=>{}){
        const url = this.getUrl(path);
        this.appService.delete(url,urlencodedParser,callback)
    }
    put<TParamsType, TBodyType>(path:string, callback=(req:Request<TParamsType,{},TBodyType>, res:Response)=>{}){
        const url = this.getUrl(path);
        this.appService.put(url,urlencodedParser,callback)
    }
}

