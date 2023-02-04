interface PartialBase{
    getName():string;
    getTemplate():string;
    getData():{} | null;
    getProps():{} | null;
    getComponents():{} | null;
    getMethods():{}| null;
    getBeforeRender():()=>{} | null
    getAfterRender():()=>{} | null
}

export class Partial implements PartialBase,UpdaterBase{
    private rootNode:ChildNode;

    private readonly name: string;

    private readonly template: string;

    private data?: {};

    private readonly props?: {};

    private readonly methods?:{};

    private readonly components?:{};

    private readonly beforeRender?:()=>{};

    private readonly afterRender?:()=>{};

    private map:Map<string, any>;

    constructor(partial:{
        name:string,
        template:string,
        data?:{},
        props?:string[],
        computed?:{},
        methods?:{},
        components?:{},
        beforeRender?:()=>{},
        afterRender?:()=>{}
    }) {
        this.name = partial.name;
        this.template = partial.template;
        this.data = partial.data;
        this.props = partial.props;
        this.methods = partial.methods;
        this.components = partial.components;
        this.beforeRender = partial.beforeRender;
        this.afterRender = partial.afterRender;
    }

    getRootNode(): ChildNode {
        return this.rootNode;
    }

    set root(node:ChildNode){
        this.rootNode = node;
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

    getProps(): {} {
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

    getComponents(): {} {
        return this.components;
    }
    getBeforeRender(): () => {} {
        return this.beforeRender;
    }
    getAfterRender(): () => {} {
        return this.afterRender;
    }

    getName(): string {
        return this.name;
    }

    getTemplate(): string {
        return this.template;
    }
}