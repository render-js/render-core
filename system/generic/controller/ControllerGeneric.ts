import {ContextController} from "../../prototype/ContextController";
import {Component} from "../../../index";
import {OriginalDataGeneric} from "../data/OriginalDataGeneric";

/**
 * The class is the prototype of controller
 */
export interface ControllerGeneric{
    /*指向该控制器的根元素*/
    componentAttachedRootElement:ParentNode;

    /*指向该控制器的原型对象*/
    prototypeOfComponent:Component;

    /*指向改控制对象的父亲控制对象*/
    parentController:ContextController;

    /*在解压挂载中指定起始锚点*/
    anchorBegin:HTMLElement;

    /*在解压挂载中指定终止锚点*/
    anchorEnd:HTMLElement;

    /*组件元信息*/
    componentConfig:{
        boxMode: boolean;
    };

    /*保存着可以直接更改的原始数据*/
    originalData:OriginalDataGeneric;

    /*raw_data的method代理对象*/
    dataForMethod:OriginalDataGeneric;

    /*raw_data的computed代理对象*/
    dataForComputed:OriginalDataGeneric;

    /*raw_data的watcher代理对象*/
    dataForWatcher:OriginalDataGeneric;

    /*保存着salt的对象*/
    salt:Map<string, any>;

    /*保存着惰性组件的容器*/
    lazyComponent:Map<string,{}>;

    /*保存着该控制对象的所有子控制对象*/
    slaveComponent:ContextController[];

    /*方法*/
    method:{};

    /*计算属性*/
    computed:{};

    /*监控属性*/
    watcher:{};

    /*接收器*/
    receiver(method:string, ...args:any[]):any;
}