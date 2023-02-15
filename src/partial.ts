interface PartialBase{
    getName():string;
    getTemplate():string;
    getData():{};
    getProps():{};
    setProps(key:string,value:any)
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

    private readonly props?: {};

    private data?: {};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly components?:{};

    private beforeRender?:() => void;

    private afterRender?:() => void;

    private beforeUpdate?:() => void;

    private afterUpdate?:() => void;

    private beforeMount?:() => void;

    private beforeUnmount?:() => void;

    private map:Map<string, any>;

    constructor(partial:{
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
        this.name = partial.name;
        this.template = partial.template;
        if (typeof partial.data == null){
            this.data = {};
        }else {
            this.data = partial.data;
        }
        if (typeof partial.computed == null){
            this.computed = {};
        }else {
            this.computed = partial.computed;
        }
        if (typeof partial.methods == null){
            this.methods = {};
        }else {
            this.methods = partial.methods;
        }
        if (typeof partial.components == null){
            this.components = {};
        }else {
            this.components = partial.components;
        }
        if (typeof partial.beforeRender == null){
            this.beforeRender = function (){}
        }else {
            this.beforeRender = partial.beforeRender;
        }
        if (typeof partial.afterRender == null){
            this.afterRender = function (){}
        }else {
            this.afterRender = partial.afterRender;
        }
        if (typeof partial.beforeUpdate == null){
            this.beforeUpdate = function (){}
        }else {
            this.beforeUpdate = partial.beforeUpdate;
        }
        if (typeof partial.afterRender == null){
            this.afterUpdate = function (){}
        }else {
            this.afterUpdate = partial.afterUpdate;
        }
        if (typeof partial.afterRender == null){
            this.beforeMount = function (){}
        }else {
            this.beforeMount = partial.beforeMount;
        }
        if (typeof partial.afterRender == null){
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

    getProps(): {} {
        return this.props;
    }

    setProps(key: string, value: any) {
        this.props[key] = value;
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
    setBeforeUpdate(render:()=>void){
        this.beforeUpdate = render;
    }

    getAfterUpdate(): () => void {
        return this.afterUpdate;
    }
    setAfterUpdate(render:()=>void){
        this.afterUpdate = render;
    }

    getBeforeMount(): () => void {
        return this.beforeMount;
    }
    setBeforeMount(render:()=>void){
        this.beforeMount = render;
    }

    getBeforeUnmount(): () => void {
        return this.beforeUnmount;
    }
    setBeforeUnmount(render:()=>void){
        this.beforeUnmount = render;
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
}