import {RouterGeneric} from "../generic/RouterGeneric";
import {Component} from "../../index";

export class RouterAction implements RouterGeneric{

    private routerTable;

    constructor(routeTable:{
        mode?: string,
        table?:[
            {
                path:string,
                component: Component
            }
        ]
    }) {
        this.routerTable = routeTable;
    }

    getComponentByUrl(url: string): Component {
        return undefined;
    }

    getQueriesByUrl(url: string): Map<string, any> {
        return undefined;
    }

}