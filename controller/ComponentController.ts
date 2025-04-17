import {Component} from "render-refer";

export class ComponentController {

    //指向该元素的根元素
    public componentAttachedRootElement:ParentNode;

    //指向该控制器的原型对象
    public prototypeOfComponent:Component;

    //保存着可以直接更改的原始数据
    public originalData:{};

    //raw_data的代理对象
    public dataForMethod:{};

    //raw_data的代理对象
    public dataForComputed:{};

    //组件元信息
    public componentConfig:{
        boxMode: boolean;
    };

    //保存这salt的对象
    public salt:Map<string, any>;

    //保存着惰性组件的容器
    public lazyComponent:Map<string,{}>;

    //保存着该控制对象的所有子控制对象
    public slaveComponent:ComponentController[];

    //计算属性
    public computed:{};

    //监控属性
    public watcher:{};

    //构造函数
    constructor() {

        this.lazyComponent = new Map<string, {}>();

        this.slaveComponent = Array();

        this.originalData = {};

        this.salt = new Map<string,any>();

        this.computed = {};

        this.watcher = {};

        this.componentConfig = {
            boxMode: true
        };
    }

    //接收器
    public receiver(method:string, ...args:any[]):any
    {
        return this.prototypeOfComponent.getMethods()[method].apply(this.dataForMethod,args);
    }
}