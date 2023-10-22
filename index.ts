import {Component} from "./class/component/component";
import {PageController} from "./class/controller/pageController";
import {registerTagLib, render} from "./runtime/tools";
import {AppController} from "./class/controller/appController";
import {RenderTip} from "./class/tips/renderTip";
import {ContextController} from "./class/controller/contextController";

/**
 * This class is the application class.
 */
export class RenderJS implements RenderTip{

    //Meta data
    public readonly config:{};

    //Customed tagLib
    public readonly tagLib:Map<string, Component>;

    //Customed styleLib
    public readonly styleLib:Map<string, Map<string, string>>;

    //Application controller
    private application:AppController;

    //Context controller
    private context:ContextController;

    //Page controller
    public page:PageController;

    constructor() {
        //initiate the tagLib object
        this.tagLib = new Map<string,Component>();

        //initiate the styleLib object
        this.styleLib = new Map<string, Map<string, string>>();

        //initiate the application controller
        this.application = new AppController();

        //initiate the context controller
        this.context = new ContextController();

        //initiate the page controller
        this.page = new PageController();

        //initiate the config object
        this.config = {};
    }

    /**
     *
     * @param config
     */
    configApp(config: {}): void {
        this.application.saveFileds(config);
        this.application.storeFileds();
        this.application.loadFileds();
    }

    /**
     *
     * @param cinfig
     */
    configContext(cinfig: {}): void {
        this.context.saveFileds(cinfig);
        this.context.storeFileds();
        this.context.loadFileds();
    }

    /**
     *
     * @param callable
     */
    use(callable): void {
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
        Reflect.set(window,"context",this.context);
        Reflect.set(window,"page",this.page);
    }

    /**
     * This method is the boster method of the render.
     */
    public run():void
    {
        //挂载对象
        this.mount();
        
        //execute
        render(this);
    }
}