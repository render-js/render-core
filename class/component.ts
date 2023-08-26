interface RenderBase{
    getName():string;
    getTemplate():string;
    getBoxStyle(): string;
    getProps(): {};
    getData():{};
    getComputed():{};
    getMethods():{};
    getWatcher():{};
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

    private readonly boxStyle?: string

    private readonly props?:{} | string[];

    private readonly data?:{};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly watcher?:{};

    private readonly beforeRender?:() => void;

    private readonly afterRender?:() => void;

    private readonly beforeUpdate?:() => void;

    private readonly afterUpdate?:() => void;

    private readonly beforeMount?:() => void;

    private readonly beforeUnmount?:() => void;

    constructor(config:{
        name:string,
        template:string,
        boxStyle?: string,
        props?:{} | string[],
        data?:{},
        computed?:{},
        methods?:{},
        watcher?:{},
        beforeRender?:()=>void,
        afterRender?:()=>void,
        beforeUpdate?:()=>void,
        afterUpdate?:()=>void,
        beforeMount?:()=>void,
        beforeUnmount?:()=>void;
    }) {
        //标签名称
        this.name = config.name;
        //标签模板样式
        this.template = config.template;
        //添加box样式
        if (typeof config.boxStyle === "undefined"){
            this.boxStyle = "";
        }else {
            this.boxStyle = config.boxStyle;
        }
        //添加数据
        if (typeof config.props === "undefined"){
            this.props = [];
        }else {
            this.props = config.props;
        }
        //添加数据
        if (typeof config.data === "undefined"){
            this.data = {};
        }else {
            this.data = config.data;
        }
        //添加计算属性
        if (typeof config.computed === "undefined"){
            this.computed = {};
        }else {
            this.computed = config.computed;
        }
        //添加方法属性
        if (typeof config.methods === "undefined"){
            this.methods = {};
        }else {
            this.methods = config.methods;
        }
        //添加监控属性
        if (typeof config.watcher === "undefined"){
            this.watcher = {};
        }else {
            this.watcher = config.watcher;
        }
        //生命周期函数
        if (typeof config.beforeRender === "undefined"){
            this.beforeRender = function (){}
        }else {
            this.beforeRender = config.beforeRender;
        }
        if (typeof config.afterRender === "undefined"){
            this.afterRender = function (){}
        }else {
            this.afterRender = config.afterRender;
        }
        if (typeof config.beforeUpdate === "undefined"){
            this.beforeUpdate = function (){}
        }else {
            this.beforeUpdate = config.beforeUpdate;
        }
        if (typeof config.afterUpdate === "undefined"){
            this.afterUpdate = function (){}
        }else {
            this.afterUpdate = config.afterUpdate;
        }
        if (typeof config.beforeMount === "undefined"){
            this.beforeMount = function (){}
        }else {
            this.beforeMount = config.beforeMount;
        }
        if (typeof config.beforeUnmount === "undefined"){
            this.beforeUnmount = function (){}
        }else {
            this.beforeUnmount = config.beforeUnmount;
        }
    }

    getName(): string {
        return this.name;
    }

    getTemplate(): string {
        return this.template;
    }

    getBoxStyle():string{
        return this.boxStyle;
    }

    getProps(): {}{
        return this.props;
    }

    getData():{}{
        return this.data;
    }

    getMethods(): {} {
        return this.methods;
    }

    getComputed():{}{
        return this.computed;
    }

    getWatcher(): {} {
        return this.watcher;
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