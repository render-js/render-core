import {Component} from "./class/component/component";
import {PageController} from "./class/controller/pageController";
import {registerTagLib, render} from "./runtime/tools";
import {AppController} from "./class/controller/appController";
import {RenderTip} from "./class/tips/renderTip";
import {ContextController} from "./class/controller/contextController";
import {localStorageEngine_read, sessionStorageEngin_read} from "./status/read/read";
import {localStorageEngine_write, sessionStorageEngin_write} from "./status/write/write";

/**
 * This class is the application class.
 */
export class RenderJS implements RenderTip{

    //Meta data
    public readonly config:{};

    //Custom tagLib
    public readonly tagLib:Map<string, Component>;

    //Custom styleLib
    public readonly styleLib:Map<string, Map<string, string>>;

    //Application controller
    private readonly application:AppController;

    //Context controller
    private readonly context:ContextController;

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
    public configApp(config: {}): void {
        this.application.saveFields(config);
        this.application.storeFields();
        this.application.loadFields();
    }

    /**
     *
     * @param config
     */
    public configContext(config: {}): void {
        this.context.saveFields(config);
        this.context.storeFields();
        this.context.loadFields();
    }

    /**
     *
     * @param callable
     */
    public use(callable): void {
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
     * This method is the booster method of the render.
     */
    public run():void
    {
        //挂载对象
        this.mount();

        //execute
        render(this);
    }

    /**
     *
     * @param name
     * @param func
     */
    public registerElements(name:string, func:any):void{
        Reflect.set(window,name,func);
    }
}

/**
 * The tool to register element to window
 * @param name
 * @param func
 */
export function registerElements(name:string, func:any):void{
    Reflect.set(window,name,func);
}

/**
 * This is the read api of status.
 * @param config
 */
export function status_read(config:{
    type:string,
    fields:string[]
}):any
{
    let fields:string[] = config.fields;

    const message:{} = {};

    if (config.type == "session"){
        fields.forEach((value) => {
            message[value] = sessionStorageEngin_read(value);
        })
    }else {
        fields.forEach((value) => {
            message[value] = localStorageEngine_read(value);
        })
    }
    return message;
}

/**
 * This is the write api of status.
 * @param config
 */
export function status_write(config:{
    type:string,
    fields:{}
}):void
{
    let fields:string[] = Object.getOwnPropertyNames(config.fields);

    if (config.type == "session"){
        fields.forEach((value) => {
            sessionStorageEngin_write(value,config.fields);
        })
    }else {
        fields.forEach((value) => {
            localStorageEngine_write(value,config.fields);
        })
    }
}