import {ControllerGeneric} from "../generic/controller/ControllerGeneric";
import {Component} from "../../index";
import {OriginalDataGeneric} from "../generic/data/OriginalDataGeneric";
import {ComputedDataGeneric} from "../generic/data/ComputedDataGeneric";
import {WatcherDataGeneric} from "../generic/data/WatcherDataGeneric";

export class ContextController implements ControllerGeneric{

    public componentAttachedRootElement:ParentNode | Element;

    public prototypeOfComponent:Component;

    public parentController: ContextController;

    public anchorBegin:HTMLElement;

    public anchorEnd:HTMLElement;

    public componentConfig:{
        boxMode: boolean;
        plugins?: Map<string, any>
    };

    public originalData:OriginalDataGeneric;

    public dataForMethod:OriginalDataGeneric;

    public dataForComputed: ComputedDataGeneric;

    public dataForWatcher:WatcherDataGeneric;

    public salt:Map<string, any>;

    public lazyComponent:Map<string,{}>;

    public slaveComponent:ContextController[];

    public method:{};

    public computed:{};

    public watcher:{};

    constructor(config:{ boxMode: boolean })
    {
        this.componentConfig = config
        this.lazyComponent = new Map<string, {}>();
        this.slaveComponent = Array();
        this.salt = new Map<string,any>();
    }

    public receiver(method:string, ...args:any[]):any
    {
        return this.prototypeOfComponent.getMethods()[method].apply(this.dataForMethod,args);
    }
}