import {Router} from "./router";
import {definePage} from "../../index";

export class RenderJs{
    public router:Router;

    private mount:string;

    constructor(config:{
        mount:string
    }) {
        this.mount = config.mount;
    }

    public static render(component:{
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
    }){
        definePage(component);
    }
}