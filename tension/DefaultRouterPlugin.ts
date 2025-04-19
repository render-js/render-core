import {PrefaceGeneric} from "./generic/PrefaceGeneric";
import {HooksGeneric} from "./generic/HooksGeneric";
import {RouterAction} from "./prototype/RouterAction";
import {Component} from "../index";
import {PluginGeneric} from "./generic/PluginGeneric";

export class DefaultRouterPlugin implements PluginGeneric{

    private readonly routerTable: { mode: string; table: [{ path: string; component: Component}]; };

    constructor(routeTable:{
        mode: string,
        table:[
            {
                path:string,
                component: Component
            }
        ]
    })
    {
        this.routerTable = routeTable;
    }

    plugin(preface: PrefaceGeneric, hooks: HooksGeneric) {
        preface.set_router(new RouterAction(this.routerTable));
    }
}