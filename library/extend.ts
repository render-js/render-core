import {Component} from "../class/component";

export function extendTag(component:{
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
    return new Component(component);
}