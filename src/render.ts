interface RenderBase{
    getName():string;
    getTemplate():string;
    getData():{} |null;
    getComponents():{} | null;
    getMethods():{}| null;
    getBeforeRender():()=>{} | null
    getAfterRender():()=>{} | null
}

export class Page implements RenderBase,UpdaterBase{

    private rootNode:ChildNode;

    private readonly name: string;

    private readonly template: string;

    private readonly props?:{};

    private data:{};

    private readonly methods?:{};

    private readonly components?:{};

    private readonly beforeRender?:()=>{};

    private readonly afterRender?:()=>{};

    private map:Map<string, any>;

    constructor(page:{
        name:string,
        template:string,
        props?:string[],
        data?:{},
        computed?:{},
        methods?:{},
        components?:{},
        beforeRender?:()=>{},
        afterRender?:()=>{}
    }) {
        this.name = page.name;
        this.template = page.template;
        this.data = page.data;
        this.props = page.props;
        this.components = page.components;
        this.beforeRender = page.beforeRender;
        this.afterRender = page.afterRender;
    }

    getRootNode(): ChildNode {
        return this.rootNode;
    }

    set root(node:ChildNode){
        this.rootNode = node;
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

    getData(): {} | null{
        return this.data
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
    getBeforeRender(): () => {} | null {
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