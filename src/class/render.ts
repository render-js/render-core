import {UpdaterBase} from "../core/proxy/proxy";

interface RenderBase{
    getName():string;
    getTemplate():string;
    getData():{};
    getComponents():{};
    getMethods():{};
    getBeforeRender():()=>void
    getAfterRender():()=>void
    getBeforeUpdate():()=>void
    getAfterUpdate():()=>void
    getBeforeMount():()=>void
    getBeforeUnmount():()=>void
}

export class Page implements RenderBase,UpdaterBase{

    private rootNode:Element;

    private readonly name: string;

    private readonly template: string;

    private data:{};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly components?:{};

    private beforeRender?:() => void;

    private afterRender?:() => void;

    private readonly beforeUpdate?:() => void;

    private readonly afterUpdate?:() => void;

    private readonly beforeMount?:() => void;

    private readonly beforeUnmount?:() => void;

    private map:Map<string, any>;

    constructor(page:{
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
    }) {
        this.name = page.name;
        this.template = page.template;
        if (typeof page.data == "undefined"){
            this.data = {};
        }else {
            this.data = page.data;
        }
        if (page.computed == "undefined"){
            this.computed = {};
        }else {
            this.computed = page.computed;
        }
        if (typeof page.components == "undefined"){
            this.components = {};
        }else {
            this.components = page.components;
        }
        if (typeof page.beforeRender == "undefined"){
            this.beforeRender = function (){}
        }else {
            this.beforeRender = page.beforeRender;
        }
        if (typeof page.afterRender == "undefined"){
            this.afterRender = function (){}
        }else {
            this.afterRender = page.afterRender;
        }
        if (typeof page.beforeUpdate == "undefined"){
            this.beforeUpdate = function (){}
        }else {
            this.beforeUpdate = page.beforeUpdate;
        }
        if (typeof page.afterUpdate == "undefined"){
            this.afterUpdate = function (){}
        }else {
            this.afterUpdate = page.afterUpdate;
        }
        if (typeof page.beforeMount == "undefined"){
            this.beforeMount = function (){}
        }else {
            this.beforeMount = page.beforeMount;
        }
        if (typeof page.beforeUnmount == "undefined"){
            this.beforeUnmount = function (){}
        }else {
            this.beforeUnmount = page.beforeUnmount;
        }
    }

    set root(node:Element){
        this.rootNode = node;
    }
    getRootNode(): Element {
        return this.rootNode;
    }

    getName(): string {
        return this.name;
    }

    getTemplate(): string {
        return this.template;
    }

    getData(): {}{
        return this.data
    }

    setData(data:{}){
        this.data = data;
    }

    getMethods(): {} {
        return this.methods;
    }

    getComputed():{}{
        return this.computed;
    }

    getComponents(): {} {
        return this.components;
    }

    getComponentCollection(key: string): any {
        return this.map.get(key);
    }

    get collection(){
        return this.map;
    }

    set collection(map:Map<string, ChildNode[]>){
        this.map = map;
    }

    getBeforeRender(): () => void {
        return this.beforeRender;
    }
    setBeforeRender(render:()=>void){
        this.beforeRender = render;
    }

    getAfterRender(): () => void {
        return this.afterRender;
    }
    setAfterRender(render:()=>void){
        this.afterRender = render;
    }

    getBeforeUpdate(): () => void {
        return this.beforeUpdate;
    }

    getAfterUpdate(): () => void {
        return this.afterUpdate;
    }

    getBeforeMount(): () => void {
        return this.beforeMount;
    }

    getBeforeUnmount(): () => void {
        return this.beforeUnmount;
    }
}