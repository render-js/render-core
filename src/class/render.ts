interface RenderBase{
    getName():string;
    getTemplate():string;
    getData():{};
    getProps():{} | null;
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

export class Page implements RenderBase,UpdaterBase{

    private rootNode:Element;

    private readonly name: string;

    private readonly template: string;

    private readonly props?:{};

    private data:{};

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
        if (typeof page.data == null){
            this.data = {};
        }else {
            this.data = page.data;
        }
        if (page.computed == null){
            this.computed = {};
        }else {
            this.computed = page.computed;
        }
        if (typeof page.components == null){
            this.components = {};
        }else {
            this.components = page.components;
        }
        if (typeof page.beforeRender == null){
            this.beforeRender = function (){}
        }else {
            this.beforeRender = page.beforeRender;
        }
        if (typeof page.afterRender == null){
            this.afterRender = function (){}
        }else {
            this.afterRender = page.afterRender;
        }
        if (typeof page.beforeUpdate == null){
            this.beforeUpdate = function (){}
        }else {
            this.beforeUpdate = page.beforeUpdate;
        }
        if (typeof page.afterRender == null){
            this.afterUpdate = function (){}
        }else {
            this.afterUpdate = page.afterUpdate;
        }
        if (typeof page.afterRender == null){
            this.beforeMount = function (){}
        }else {
            this.beforeMount = page.beforeMount;
        }
        if (typeof page.afterRender == null){
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

    getProps(): {} {
        return this.props;
    }

    setProps(key: string, value: any) {
        this.props[key] = value;
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

    getComponentCollection(key:string):any {
        return this.map.get(key);
    }

    get collection(){
        return this.map;
    }

    set collection(map:Map<string, ChildNode[]>){
        this.map = map;
    }
}