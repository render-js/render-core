import {Component} from "./class/component";
import ApiComponent from "./class/apiComponent";
import meta from "./meta/meta";
import {renderHtml} from "./runtime/runtime";
import {apiRender} from "./core/render/apiRender";

//页面RenderJs
export class RenderJS{

    //版本号
    public readonly version:string;

    //自定义标签库
    readonly tagLib:Map<string, Component>;

    //构造函数
    constructor() {
        this.tagLib = new Map<string,Component>();
        this.version = meta.version;
    }

    //添加自定义标签
    public addTag(component:Component | Component[]):void
    {
        if (component instanceof Component) {
            if (!this.tagLib.has(component.getName().toUpperCase()))
            {
                this.tagLib.set(component.getName().toUpperCase(),component)
            }else {
                console.warn("The Tag:"+component.getName().toUpperCase()+"has been registered!")
            }
        }else {
            component.forEach(component =>{
                if (!this.tagLib.has(component.getName().toUpperCase()))
                {
                    this.tagLib.set(component.getName().toUpperCase(),component)
                }else {
                    console.warn("The Tag:"+component.getName().toUpperCase()+"has been registered!")
                }
            })
        }
    }

    //运行renderJs
    public run():void
    {
        Reflect.set(window,"tagLib",this.tagLib);
        renderHtml(document.body.children,this.tagLib)
    }
}

//嵌入式RenderJs
export class EmbedRenderJs{

    //嵌入式控制对象
    private readonly apiComponent:ApiComponent;

    //嵌入式交互对象
    private controller:{};

    //构造函数
    constructor(config:{
        name:string,
        template:string,
        data?:{},
        computed?:{},
        methods?:{},
        watcher?:{},
        beforeRender?:()=>void,
        afterRender?:()=>void,
        beforeUpdate?:()=>void,
        afterUpdate?:()=>void,
        beforeMount?:()=>void,
        beforeUnmount?:()=>void;
    }) {
        this.apiComponent = new ApiComponent(config);
    }

    //渲染嵌入式app
    public render(selector:string):void
    {
        this.controller = apiRender(this.apiComponent,document.getElementById(selector),this.apiComponent.getName(),Reflect.get(window,"tagLib"));
    }

    //与嵌入式app交互
    public commit(method:string, ...args:any[]):any
    {
        return this.controller[method](args);
    }
}