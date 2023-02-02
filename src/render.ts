interface RenderBase{
    getName():string;
    getTemplate():string;
    getData():{} |null;
    getComponents():{} | null;
    getMethods():{}| null;
    getBeforeRender():()=>{} | null
    getAfterRender():()=>{} | null
}

export class Page implements RenderBase{
    private readonly name: string;

    private readonly template: string;

    private readonly methods?:{};

    private readonly components?:{};

    private readonly beforeRender?:()=>{};

    private readonly afterRender?:()=>{};

    private readonly data:{}

    public hash:string;

    constructor(page:{
        name:string,
        template:string,
        data?:()=>{},
        methods?:{},
        components?:{},
        beforeRender?:()=>{},
        afterRender?:()=>{}
    }) {
        this.name = page.name;
        this.template = page.template;
        this.data = page.data()
        this.components = page.components;
        this.beforeRender = page.beforeRender;
        this.afterRender = page.afterRender;
    }

    getData(): {} | null{
        return this.data
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