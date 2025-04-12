import {PageController} from "./lib/proto/controller/PageController";
import {registerTagLib, render} from "./runtime/tools";
import {changeStyle, changeTheme} from "./core/utility/styleUtility";
import {AppController} from "./lib/proto/controller/AppController";
import {AbstractRenderJS, Component} from "render-refer";
import {PluginGeneric} from "render-refer/generic/PluginGeneric";
import {RenderGeneric} from "./lib/generic/RenderGeneric";

/**
 * This proto is the application proto.
 */
export class RenderJS extends AbstractRenderJS implements RenderGeneric{

    //Custom tagLib
    public readonly tagLib:Map<string, Component>;

    //Custom styleLib
    public readonly styleLib:Map<string, Map<string, string>>;

    //Application controller
    private readonly application:AppController;

    //Page controller
    public page:PageController;

    constructor() {

        super();

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
     */
    public use(plugin:PluginGeneric) {
        plugin.plugin(this);
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
     * @return void
     */
    private mount() {
        Reflect.set(window,"tagLib",this.tagLib);
        Reflect.set(window,"styleLib",this.styleLib);
        Reflect.set(window,"appSite",this.application);
        Reflect.set(window,"context",this.page);
    }

    /**
     * This method is the booster method of the render.
     * @return void
     */
    public run():void
    {
        //挂载对象
        this.mount();

        //注册函数
        this.registerElements("changeStyle",changeStyle);

        //注册函数
        this.registerElements("changeTheme",changeTheme);

        //execute
        render(this);
    }
}

/**
 * Inject element to the window environment.
 * @param name
 * @param func
 */
export function registerElement(name:string, func:any):void{
    Reflect.set(window,name,func);
}