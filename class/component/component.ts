import {RenderBase} from "../tips/componentTip";

/**
 * This is the component class.
 */
export class Component implements RenderBase{

    private readonly name: string;

    private readonly template: string;

    private readonly mode:string;

    private readonly boxStyle?: string

    private readonly props?:{} | string[];

    private readonly data?:{};

    private readonly methods?:{};

    private readonly computed?:{};

    private readonly watcher?:{};

    private readonly beforeRender?:() => void;

    private readonly afterRender?:() => void;

    constructor(config:{
        name:string,
        template:string,
        mode?:string,
        boxStyle?: string,
        props?:{} | string[],
        data?:{},
        computed?:{},
        methods?:{},
        watcher?:{},
        beforeRender?:()=>void,
        afterRender?:()=>void,
    }) {
        //标签名称
        this.name = config.name;

        //标签模板样式
        this.template = config.template;

        //添加box样式
        if (typeof config.mode === "undefined"){
            this.mode = "box";
        }else {
            this.mode = config.mode;
        }
        //添加box样式
        if (typeof config.boxStyle === "undefined"){
            this.boxStyle = "";
        }else {
            this.boxStyle = config.boxStyle.replace(/^{/,"");
            this.boxStyle = this.boxStyle.replace(/}$/,"");
            this.boxStyle = this.boxStyle.replace(/\n/,"");
            this.boxStyle = this.boxStyle.trim();
        }

        //props validate
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
            this.beforeRender = function ():void{}
        }else {
            this.beforeRender = config.beforeRender;
        }

        if (typeof config.afterRender === "undefined"){
            this.afterRender = function ():void{}
        }else {
            this.afterRender = config.afterRender;
        }
    }

    getName(): string {
        return this.name;
    }

    getTemplate(): string {
        return this.template;
    }

    getMode():string{
        return this.mode;
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
}