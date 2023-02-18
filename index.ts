import {Page} from "./src/class/render";
import {Partial} from "./src/class/partial";
import {Router} from "./src/class/router";
import {Shell} from "./src/class/shell";
import {RenderPage} from "./src/core/render/render";
import {Runtime} from "./src/core/react/react";

export function definePage(render:{
    name:string,
    template:string,
    data?:{},
    computed?:{},
    methods?:{},
    components?:{},
    beforeRender?:()=>void,
    afterRender?:()=>void,
    beforeUpdate?:()=>void,
    afterUpdate?:()=>void,
    beforeMount?:()=>void,
    beforeUnmount?:()=>void;
}):any{
    let component:Page = new Page(render)
    component.collection = new Map<string,ChildNode[]>()
    RenderPage(component)
}

export function definePartial(partial:{
    name:string,
    template:string,
    props:string[],
    data?:{},
    computed?:{},
    methods?:{},
    components?:{},
    beforeRender?:()=>void,
    afterRender?:()=>void,
    beforeUpdate?:()=>void,
    afterUpdate?:()=>void,
    beforeMount?:()=>void,
    beforeUnmount?:()=>void;
}):any{
    let component:Partial = new Partial(partial);
    component.collection = new Map<string,ChildNode[]>()
    return component;
}

export function defineRouter(config:{
    routes: {
        path:string,
        render: string,
        meta: {},
        beforeEnter:()=>{}
    }[],
    beforeEach:()=>{},
    http:{}
}){
    return new Router(config)
}

export function createApp(config:{
    mount:string
}){
    return new Shell(config)
}

export function runtime():any{
    return new Runtime();
}