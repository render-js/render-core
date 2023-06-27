import {renderHtml} from "./core/render/render";
import {Component} from "./class/component";
import ApiComponent from "./class/apiComponent";
import {renderApiComponent} from "./core/render/apiRender";

export class EJS{
    readonly tagLib:Map<string, Component>

    constructor() {
        this.tagLib = new Map<string,Component>();
    }

    public run():void
    {
        Reflect.set(window,"tagLib",this.tagLib);
        renderHtml(document.body.children,this.tagLib)
    }

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
}

export class callableComponent{

    readonly tagLib:Map<string, Component>

    private readonly apiComponent:ApiComponent;

    private controller:{};

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
        this.tagLib = new Map<string, Component>();
    }

    public render(selector:string):void
    {
        this.controller = renderApiComponent(this.apiComponent,document.getElementById(selector),this.apiComponent.getName(),Reflect.get(window,"tagLib"));
    }

    public commit(method:string, ...args:any[]):any
    {
        return this.controller[method](args);
    }
}