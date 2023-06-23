import {renderHtml} from "./core/render/render";
import {Component} from "./class/component";

export class EJS{
    readonly tagLib:Map<string, Component>

    constructor() {
        this.tagLib = new Map<string,Component>();
    }

    public run():void
    {
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