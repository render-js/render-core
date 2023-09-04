import ApiComponent from "../component/apiComponent";
import {Controller} from "./controller";

export class ApiController{

    public root:ParentNode;

    public proto:ApiComponent;

    public solt:Map<string, any>;

    public preRender:boolean;

    public link:Map<string,{}>;

    public to:Controller[];

    public raw_data:{};

    public proxyForMethods:{};

    constructor() {
        this.link = new Map<string, {}>();
        this.preRender = false;
        this.solt = new Map<string,any>();
    }

    //接收器
    public receiver(method:string, ...args:any[]):any
    {
        return this.proto.getMethods()[method].apply(this.proxyForMethods,args);
    }
}