import {Component} from "./class/component/component";
import {PageController} from "./class/controller/pageController";
import {registerTagLib, render} from "./runtime/tools";
import {AppController} from "./class/controller/appController";
import {RenderTip} from "./class/tips/renderTip";
import {changeStyle, changeTheme} from "./core/utility/styleUtility";

/**
 * This class is the application class.
 */
export class RenderJS implements RenderTip{

    //Custom tagLib
    public readonly tagLib:Map<string, Component>;

    //Custom styleLib
    public readonly styleLib:Map<string, Map<string, string>>;

    //Application controller
    private readonly application:AppController;

    //Page controller
    public page:PageController;

    constructor() {
        //initiate the tagLib object
        this.tagLib = new Map<string,Component>();

        //initiate the styleLib object
        this.styleLib = new Map<string, Map<string, string>>();

        //initiate the application controller
        this.application = new AppController();

        //initiate the page controller
        this.page = new PageController();
    }

    /**
     * This func is the plugin entry to third vendor
     * @param callable
     */
    public use(callable:(render:RenderJS)=>void): void {
        callable(this);
    }

    /**
     * You can use the method to register your single component or an array of components.
     * @param component
     */
    public addTag(component:Component | Component[]):void
    {
        registerTagLib(this,component);
    }

    /**
     * mount some base object
     */
    private mount() {
        Reflect.set(window,"tagLib",this.tagLib);
        Reflect.set(window,"styleLib",this.styleLib);
        Reflect.set(window,"appSite",this.application);
        Reflect.set(window,"context",this.page);
    }

    /**
     * This method is the booster method of the render.
     */
    public run():void
    {
        //挂载对象
        this.mount();

        //注册函数
        registerElements("changeStyle",changeStyle);

        //注册函数
        registerElements("changeTheme",changeTheme);

        //plugin
        this.use((render:RenderJS):void => {
            sessionStorage.setItem("theme_style","default");
        })

        //execute
        render(this);
    }

    /**
     * Use the func to register some tool-functions to the windows object.
     * @param name
     * @param func
     */
    public registerElements(name:string, func:any):void{
        Reflect.set(window,name,func);
    }
}

/**
 * Use the func to register some tool-functions to the windows object.
 * @param name
 * @param func
 */
export function registerElements(name:string, func:any):void{
    Reflect.set(window,name,func);
}