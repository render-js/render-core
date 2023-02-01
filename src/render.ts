interface RenderBase{
    getName():string;
    getTemplate():string;
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

    public hash:string;

    constructor(page:{
        name:string,
        template:string,
        methods?:{},
        components?:{},
        beforeRender?:()=>{},
        afterRender?:()=>{}
    }) {
        this.name = page.name;
        this.template = page.template;
        this.components = page.components;
        this.beforeRender = page.beforeRender;
        this.afterRender = page.afterRender;
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