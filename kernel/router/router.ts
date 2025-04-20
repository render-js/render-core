import {ContextController} from "../define/ContextController";
import {get_context_controller, get_router_for_application} from "../recorder/table0/system_func_0";
import {AbstractRouter} from "../../tension/prototype/AbstractRouter";
import {spa_delivery} from "../../kernel/delivery/delivery";
import {Component} from "../../index";

export function router_listener_with_router(view:HTMLElement):void
{
    if (view !== null) {
        let controller:ContextController = get_context_controller();
        let router:AbstractRouter = get_router_for_application();
        let component = router.getComponentByUrl(location.pathname);
        spa_delivery(component, view.parentNode, view, controller);
    }
    else
        console.log("Without view element to render");
}

export function router_listener_without_router(component:Component, view:HTMLElement):void
{
    if (view !== null) {
        let controller:ContextController = get_context_controller();
            spa_delivery(component, view.parentNode, view, controller);
    }
    else
        console.log("Without view element to render");
}