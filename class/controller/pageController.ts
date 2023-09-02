import {Controller} from "./controller";

export class PageController {

    //方法
    private methods:{};

    private currentTag:Element;

    public raw_data:{};

    //观察者
    public to:Controller[];

    //旧数据对象空间
    public link:Map<string,{}>;

    //构造函数
    constructor() {
        //注入系统方法
        this.methods = Reflect.get(window,"pageMethods")
        this.link = new Map<string, {}>();
        this.to = Array();
        this.crtTag = null;
    }

    //接收器
    public receiver(method:string, ...args:any[]):void
    {

    }

    //设置当前页面的渲染元素
    set crtTag(element){
        this.currentTag = element;
    }

    //返回当前页面的渲染元素
    get crtTag(){
        return this.currentTag;
    }
}