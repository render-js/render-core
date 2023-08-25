import {Controller} from "./controller";

export class PageController {

    //方法
    private methods:{};

    private currentTag:Element;

    //观察者
    public to:Controller[];

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

    set crtTag(element){
        this.currentTag = element;
    }

    get crtTag(){
        return this.currentTag;
    }
}