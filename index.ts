import {Page} from "./src/render";
import {Partial} from "./src/partial";
import {doRender, loadPage} from "./src/utility/utility";
import {Router} from "./src/router/router";
import {Application} from "./src/application";

export function renderPage(partial:{
    name:string,
    template:string,
    data:()=>{},
    methods?:{},
    components?:{},
    beforeRender?:()=>{},
    afterRender?:()=>{}
}):any{
    let component:Page = new Page(partial)
    component.hash = "2222"
    doRender(component)
}

export function definePartial(partial:{
    name:string,
    template:string,
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

export function createAPP(config){
    return new Application()
}