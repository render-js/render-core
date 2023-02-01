interface PartialBase{
    getName():string;
    getTemplate():string;
    getComponents():{} | null;
    getMethods():{}| null;
    getBeforeRender():()=>{} | null
    getAfterRender():()=>{} | null
}

export class Partial implements PartialBase{
    private readonly name: string;

    private readonly template: string;

    private readonly methods?:{};

    private readonly components?:{};

    private readonly beforeRender?:()=>{};

    private readonly afterRender?:()=>{};

    public hash:string;

    constructor(partial:{
        name:string,
        template:string,
        methods?:{},
        components?:{},
        beforeRender?:()=>{},
        afterRender?:()=>{}
    }) {
        this.name = partial.name;
        this.template = partial.template;
        this.components = partial.components;
        this.beforeRender = partial.beforeRender;
        this.afterRender = partial.afterRender;
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