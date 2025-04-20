import {render_for_listen, render_for_render, render_for_weave} from "./xboot/entrance";
import {RenderGeneric} from "./system/generic/render/RenderGeneric";
import {registerTagLib} from "./xboot/tagProcessor";
import {HooksAction} from "./tension/prototype/HooksAction";
import {ContextController} from "./system/prototype/ContextController";
import {PluginGeneric} from "./tension/generic/plugin/PluginGeneric";
import {HooksGeneric} from "./tension/generic/plugin/hooks/HooksGeneric";
import {AbstractComponent} from "./tension/prototype/AbstractComponent";
import {set_context_controller} from "./system/recorder/table0/system_func_0";
import {PrefaceGeneric} from "./tension/generic/plugin/preface/PrefaceGeneric";
import {PrefaceAction} from "./tension/prototype/PrefaceAction";
import {SystemInitPlugin} from "./tension/SystemInitPlugin";
import {RouterGeneric} from "./tension/generic/router/RouterGeneric";

/**
 * This class is used to prototype the properties type
 */
export class PropertyType {
    public static STRING: 'string';
    public static INT: 'int';
    public static FLOAT: 'float';
    public static BOOLEAN: 'boolean';
    public static JSON: 'json';
}

/**
 * This abstract class is the plugin interface class for those who want to develop plugin for the system
 */
export abstract class AbstractPlugin implements PluginGeneric{

    plugin(preface: PrefaceGeneric, hooks:HooksGeneric): void {}
}

/**
 *  This abstract class is the router interface class for those who want to develop router for the system
 */
export abstract class AbstractRouter implements RouterGeneric{

    /**
     * The method must be overwritten by developer
     */
    getComponent(): Component {
        return undefined;
    }

    /**
     * The method must be overwritten by developer
     */
    getPathVariable(): Map<string, any> {
        return new Map<string, any>();
    }
}

/**
 * Here is the template class for render component!
 */
export class Component extends AbstractComponent{
    constructor(config:{
        name:string,
        template:string,
        config: {
            boxMode: boolean
        },
        boxStyle?: string,
        props?:{} | string[],
        data?:{},
        computed?:{},
        methods?:{},
        watcher?:{},
        beforeRender?:()=>void,
        afterRender?:()=>void,
    }) {
        super(config);
    }
}

/**
 * This proto is the application proto.
 */
export class RenderJS implements RenderGeneric{

    public contextController: ContextController;

    constructor() {

        /* initiate the page controller */
        this.contextController = new ContextController({
            boxMode: false,
        });

        /* init the basis extension */
        this.use_plugin(new SystemInitPlugin());
    }

    /**
     * This func is used to execute plugins
     */
    public use_plugin(plugin: PluginGeneric) {
        plugin.plugin(new PrefaceAction(), new HooksAction());
    }

    /**
     * This unc is used to register component to system
     * @param component
     */
    public add_tag(component: Component): void {
        registerTagLib(component);
    }

    /**
     * This func is used to work under the route mode
     */
    public listen():void{
        set_context_controller(this.contextController);
        render_for_listen();
    }

    /**
     * This func is used to work under the directive render mode
     */
    public render(component:Component, mounter:string):void{
        set_context_controller(this.contextController);
        render_for_render(component, mounter);
    }

    /**
     * This func is used to work under the weave  mode
     */
    public weave(mounter:string):void{
        set_context_controller(this.contextController);
        render_for_weave(mounter);
    }
}

/**
 * This func is used to extend window environment
 * @param on
 * @param func
 */
export function extend_window(on:string, func:any):void
{
    Reflect.set(window, on, func);
}
