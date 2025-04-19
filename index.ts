import {render_for_mpa, render_for_spa} from "./xboot/Entrance";
import {RenderGeneric} from "./system/generic/RenderGeneric";
import {registerTagLib} from "./xboot/TagProcessor";
import {HooksAction} from "./tension/prototype/HooksAction";
import {ContextController} from "./system/define/ContextController";
import {PluginGeneric} from "./tension/generic/PluginGeneric";
import {HooksGeneric} from "./tension/generic/HooksGeneric";
import {AbstractComponent} from "./tension/prototype/AbstractComponent";
import {get_router_for_application, set_context_controller} from "./system/recorder/table0/system_func_0";
import {PrefaceGeneric} from "./tension/generic/PrefaceGeneric";
import {PrefaceAction} from "./tension/prototype/PrefaceAction";
import {DefaultRouterPlugin} from "./tension/DefaultRouterPlugin";

/**
 * This class is used to define the properties type
 */
export class PropertyType {
    public static STRING: 'string';
    public static INT: 'int';
    public static FLOAT: 'float';
    public static BOOLEAN: 'boolean';
    public static JSON: 'json';
}

export abstract class AbstractRenderJS implements RenderGeneric{
    use_plugin(plugin: AbstractPlugin): void {
    }
}

export abstract class AbstractPlugin implements PluginGeneric{

    plugin(preface: PrefaceGeneric, hooks:HooksGeneric): void {

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
export class RenderJS extends AbstractRenderJS{

    public routeMode: boolean = false;

    public contextController: ContextController;

    constructor() {

        super();

        //initiate the page controller
        this.contextController = new ContextController({
            boxMode: false,
        });
    }

    /**
     * Inject element to the window environment.
     * @param name
     * @param func
     */
    public static registerElement(name:string, func:any):void{
        Reflect.set(window,name,func);
    }

    /**
     * This func is the plugin entry to third vendor
     */
    public use_plugin(plugin: PluginGeneric) {
        plugin.plugin(new PrefaceAction(), new HooksAction());
    }

    /**
     * You can use the method to register your single component or an array of components.
     * @param component
     */
    public addTag(component: Component | Component[]): void {
        registerTagLib(component);
    }

    /**
     * This method is the booster method of the render.
     * @return void
     */
    public run(component?: Component,root?:string): void
    {
        set_context_controller(this.contextController);

        if (get_router_for_application() == null){
            this.use_plugin(new DefaultRouterPlugin({
                mode: "history",
                table: [{
                    path: "",
                    component: null
                }]
            }))
        }

        if (this.routeMode)
            this.spa_run(component);
        else
            this.mpa_run(root);
    }

    private spa_run(component?: Component):void
    {
        render_for_spa(component);
    }

    private mpa_run(root?:string):void
    {
        render_for_mpa(root);
    }
}
