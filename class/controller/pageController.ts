import {ComponentController} from "./componentController";

export class PageController {

    //方法
    private methods:{};

    //当前解析tag
    private currentTag:Element;

    //solt
    public solt:Map<string, any>;

    //原始数据
    public raw_data:{};

    //观察者
    public to:ComponentController[];

    //旧数据对象空间
    public link:Map<string,{}>;

    //构造函数
    constructor() {
        //注入系统方法
        this.methods = Reflect.get(window,"pageMethods")
        this.link = new Map<string, {}>();
        this.to = Array();
        this.crtTag = null;
        this.solt = new Map<string,any>();
    }

    //接收器
    public receiver(method:string, ...args:any[]):void
    {
        this.methods[method].call(window,args);
    }

    //设置当前页面的渲染元素
    set crtTag(element:Element){
        this.currentTag = element;
    }

    //返回当前页面的渲染元素
    get crtTag(){
        return this.currentTag;
    }
}