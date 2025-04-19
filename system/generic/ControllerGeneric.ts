import {ContextController} from "../define/ContextController";
import {Component} from "../../index";

export interface ControllerGeneric{
    //指向该元素的根元素
    componentAttachedRootElement:ParentNode;

    //指向该控制器的原型对象
    prototypeOfComponent:Component;

    parentController:ContextController;

    //组件元信息
    componentConfig:{
        boxMode: boolean;
    };

    //保存着可以直接更改的原始数据
    originalData:{};

    //raw_data的代理对象
    dataForMethod:{};

    //raw_data的代理对象
    dataForComputed:{};

    //保存这salt的对象
    salt:Map<string, any>;

    //保存着惰性组件的容器
    lazyComponent:Map<string,{}>;

    //保存着该控制对象的所有子控制对象
    slaveComponent:ContextController[];

    //方法
    method:{};

    //计算属性
    computed:{};

    //监控属性
    watcher:{};

    //接收器
    receiver(method:string, ...args:any[]):any;

    flush():void;
}