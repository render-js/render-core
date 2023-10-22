import {Component} from "../component/component";

export class ComponentController {

    //指向该元素的根元素
    public root:ParentNode;

    //指向该控制器的原型对象
    public proto:Component;

    public mode:string;

    //solt
    public solt:Map<string, any>;

    //保存这该name未知更新前的数据
    public link:Map<string,{}>;

    //保存着该控制对象的所有子控制对象
    public to:ComponentController[];

    //保存着可以直接更改的原始数据
    public raw_data:{};

    //raw_data的代理对象
    public proxyForMethods:{};

    public computed:{};

    public watcher:{};

    //构造函数
    constructor() {
        this.link = new Map<string, {}>();
        this.to = Array();
        this.raw_data = {};
        this.solt = new Map<string,any>();
        this.computed = {};
        this.watcher = {};
        this.mode = "box";
    }

    //接收器
    public receiver(method:string, ...args:any[]):any
    {
        return this.proto.getMethods()[method].apply(this.proxyForMethods,args);
    }
}