import {ControllerGeneric} from "../generic/controller/ControllerGeneric";
import {update_Render} from "../../kernel/renderer/updateRender";
import {Component} from "../../index";

export class ContextController implements ControllerGeneric{

    //指向该元素的根元素
    public componentAttachedRootElement:ParentNode | Element;

    //指向该控制器的原型对象
    public prototypeOfComponent:Component;

    public parentController: ContextController;

    public anchor:HTMLElement;

    public begin:HTMLElement;

    //配置
    public componentConfig:{
        boxMode: boolean;
        plugins?: Map<string, any>
    };

    //保存着可以直接更改的原始数据
    public originalData:{};

    //raw_data的代理对象
    public dataForMethod:{};

    //raw_data的代理对象
    public dataForComputed:{};

    public dataForWatcher:{};

    //保存这salt的对象
    public salt:Map<string, any>;

    //保存着惰性组件的容器
    public lazyComponent:Map<string,{}>;

    //保存着该控制对象的所有子控制对象
    public slaveComponent:ContextController[];

    //方法
    public method:{};

    //计算属性
    public computed:{};

    //监控属性
    public watcher:{};

    //构造函数
    constructor(config:{
        boxMode: boolean,
        $plugins?: Map<string, any>
    }) {
        this.lazyComponent = new Map<string, {}>();

        this.slaveComponent = Array();

        this.salt = new Map<string,any>();

        this.componentConfig = config
    }

    //接收器
    public receiver(method:string, ...args:any[]):any
    {
        return this.prototypeOfComponent.getMethods()[method].apply(this.dataForMethod,args);
    }

    public flush() {
        update_Render(this);
    }
}