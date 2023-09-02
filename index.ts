import {Component} from "./class/component/component";
import meta from "./meta/meta";
import {reloadPage, renderHtml} from "./runtime/runtime";
import {themeStyle} from "./core/utility/styleUtility";
// @ts-ignore
import {routerController} from "render-security/class/Router";
// @ts-ignore
import {redirect} from "render-security/utility/redirect";
import {PageController} from "./class/controller/pageController";
import {App} from "./meta/app";

//页面RenderJs
export class RenderJS{

    //meta数据
    public readonly config:{};

    //自定义标签库
    readonly tagLib:Map<string, Component>;

    //security
    private routerC:routerController;

    private readonly page:PageController;

    //构造函数
    constructor() {
        this.tagLib = new Map<string,Component>();
        this.page = new PageController();
        this.config = {};
        Reflect.set(this.config,"version",meta.version)
        Reflect.set(this.config,"theme",meta.style)
    }

    //添加路由器
    public addRouter(router:routerController):void{
        this.routerC = router
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
        if (this.routerC){
            this.routerC.data.beforeRouter()
            if (typeof this.routerC.getRule(location.href) === "boolean"){
                this.render();
            }else {
                if(this.routerC.getRule(location.href).beforeRouter()){
                    this.render();
                }else {
                    redirect("/http/400.html");
                }
            }
            this.routerC.data.afterRouter()
        }else {
            this.render();
        }
    }

    private render(){
        //保存全局tagLib对象
        Reflect.set(window,"tagLib",this.tagLib);

        //获取styleLib对象
        let styleLib = new Map<string,Map<string, string>>();
        this.tagLib.forEach(function (component){
            themeStyle(component,styleLib);
        })

        Reflect.set(window,"styleLib",styleLib);

        Reflect.set(window,"context",new App())

        Reflect.set(window,"router",this.routerC);

        //开始渲染
        renderHtml(document.body.children,this.page);
    }
}