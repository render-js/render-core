interface RenderBase{
    getName():string;
    getTemplate():string;
    getData():{};
    getComputed():{};
    getMethods():{};
    getBeforeRender():()=>void
    getAfterRender():()=>void
    getBeforeUpdate():()=>void
    getAfterUpdate():()=>void
    getBeforeMount():()=>void
    getBeforeUnmount():()=>void
}

export class Component implements RenderBase{

    private readonly name: string;

    private readonly template: string;

    private readonly data:{};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly beforeRender?:() => void;

    private readonly afterRender?:() => void;

    private readonly beforeUpdate?:() => void;

    private readonly afterUpdate?:() => void;

    private readonly beforeMount?:() => void;

    private readonly beforeUnmount?:() => void;

    constructor(page:{
        name:string,
        template:string,
        data?:{},
        computed?:{},
        methods?:{},
        beforeRender?:()=>void,
        afterRender?:()=>void,
        beforeUpdate?:()=>void,
        afterUpdate?:()=>void,
        beforeMount?:()=>void,
        beforeUnmount?:()=>void;
    }) {
        this.name = page.name;
        this.template = page.template;
        //添加数据
        if (typeof page.data == "undefined"){
            this.data = {};
        }else {
            this.data = page.data;
        }
        //添加计算属性
        if (page.computed == "undefined"){
            this.computed = {};
        }else {
            this.computed = page.computed;
        }
        //添加方法属性
        if (typeof page.methods == "undefined"){
            this.methods = {};
        }else {
            this.methods = page.methods;
        }
        //生命周期函数
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

    getName(): string {
        return this.name;
    }

    getTemplate(): string {
        return this.template;
    }

    getData(): {}{
        return this.data
    }

    getMethods(): {} {
        return this.methods;
    }

    getComputed():{}{
        return this.computed;
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