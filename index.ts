import {Page} from "./src/render";
import {Partial} from "./src/partial";
import {doRender} from "./src/utility/utility";

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