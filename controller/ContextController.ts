import {ComponentController} from "./ComponentController";

export class PageController {

    //方法
    private methods:{};

    //当前解析tag
    private currentTag:Element;

    //salt
    public salt:Map<string, any>;

    //原始数据
    public originalData:{};

    //方法数据
    public dataForMethod:{};
    //TODO need to generate proxy object for original data

    //旧数据对象空间
    public lazyComponent:Map<string,{}>;

    //观察者
    public slaveComponent:ComponentController[];

    //构造函数
    constructor(data:{
    }) {
        //注入系统方法
        this.methods = Reflect.get(window,"pageMethods")
        this.lazyComponent = new Map<string, {}>();
        this.slaveComponent = Array();
        this.crtTag = null;
        this.salt = new Map<string,any>();
        this.originalData = data;
    }

    //设置当前页面的渲染元素
    public set crtTag(element:Element){
        this.currentTag = element;
    }

    //返回当前页面的渲染元素
    public get crtTag(){
        return this.currentTag;
    }

    //接收器
    public receiver(method:string, ...args:any[]):void
    {
        Reflect.get(this.methods, method).call(this.dataForMethod, args);
    }
}