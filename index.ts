import {Page} from "./src/render";
import {Partial} from "./src/partial";
import {Router} from "./src/router/router";
import {Application} from "./src/application";
import {doRenderPage} from "./src/executor";

export function renderPage(render:{
    name:string,
    template:string,
    data:()=>{},
    methods?:{},
    components?:{},
    beforeRender?:()=>{},
    afterRender?:()=>{}
}):any{
    let component:Page = new Page(render)
    component.hash = "2222"
    doRenderPage(component)
}

export function definePartial(partial:{
    name:string,
    template:string,
    data?:()=>{},
    methods?:{},
    components?:{},
    beforeRender?:()=>{},
    afterRender?:()=>{}
}):any{
    let component:Partial = new Partial(partial)
    component.hash = "2222"
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

export function createAPP(config:{
    selector:string
}){
    return new Application(config)
}