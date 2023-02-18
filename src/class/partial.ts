import {UpdaterBase} from "../core/proxy/proxy";

interface PartialBase{
    getName():string;
    getTemplate():string;
    getData():{};
    getProps():string[];
    getComponents():{};
    getMethods():{};
    getBeforeRender():()=>void
    getAfterRender():()=>void
    getBeforeUpdate():()=>void
    getAfterUpdate():()=>void
    getBeforeMount():()=>void
    getBeforeUnmount():()=>void
}

export class Partial implements PartialBase,UpdaterBase{

    private rootNode:Element;

    private readonly name: string;

    private readonly template: string;

    private readonly props?: string[];

    private data?: {};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly components?:{};

    private readonly beforeRender?:() => void;

    private readonly afterRender?:() => void;

    private readonly beforeUpdate?:() => void;

    private readonly afterUpdate?:() => void;

    private readonly beforeMount?:() => void;

    private readonly beforeUnmount?:() => void;

    private map:Map<string, any>;

    constructor(partial:{
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
    }) {
        this.name = partial.name;
        this.template = partial.template;
        if (typeof partial.props == "undefined"){
            this.props = [];
        }else {
            this.props = partial.props;
        }
        if (typeof partial.data == "undefined"){
            this.data = {};
        }else {
            this.data = partial.data;
        }
        if (typeof partial.computed == "undefined"){
            this.computed = {};
        }else {
            this.computed = partial.computed;
        }
        if (typeof partial.methods == "undefined"){
            this.methods = {};
        }else {
            this.methods = partial.methods;
        }
        if (typeof partial.components == "undefined"){
            this.components = {};
        }else {
            this.components = partial.components;
        }
        if (typeof partial.beforeRender == "undefined"){
            this.beforeRender = function (){}
        }else {
            this.beforeRender = partial.beforeRender;
        }
        if (typeof partial.afterRender == "undefined"){
            this.afterRender = function (){}
        }else {
            this.afterRender = partial.afterRender;
        }
        if (typeof partial.beforeUpdate == "undefined"){
            this.beforeUpdate = function (){}
        }else {
            this.beforeUpdate = partial.beforeUpdate;
        }
        if (typeof partial.afterUpdate == "undefined"){
            this.afterUpdate = function (){}
        }else {
            this.afterUpdate = partial.afterUpdate;
        }
        if (typeof partial.beforeMount == "undefined"){
            this.beforeMount = function (){}
        }else {
            this.beforeMount = partial.beforeMount;
        }
        if (typeof partial.beforeUnmount == "undefined"){
            this.beforeUnmount = function (){}
        }else {
            this.beforeUnmount = partial.beforeUnmount;
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

    getProps(): string[] {
        return this.props;
    }

    getData(): {} {
        return this.data;
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

    getAfterRender(): () => void {
        return this.afterRender;
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