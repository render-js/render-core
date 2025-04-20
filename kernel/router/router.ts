import {ContextController} from "../../system/prototype/ContextController";
import {get_context_controller} from "../../system/recorder/table0/system_func_0";
import {spa_delivery} from "../delivery/delivery";
import {Component} from "../../index";
import {get_system_ext_router} from "../../system/recorder/table3/system_func_3";
import {set_path_variable} from "../../system/recorder/table1/system_func_1";
import {RouterGeneric} from "../../tension/generic/router/RouterGeneric";

/**
 *
 * @param view
 */
export function router_listener_with_router(view:HTMLElement):void
{
    if (!get_system_ext_router())
        console.warn("Router not supported");
    else
    {
        if (view !== null) {
            let controller:ContextController = get_context_controller();
            let router:RouterGeneric= get_system_ext_router();
            let component = router.getComponent();
            let variable = router.getPathVariable();

            set_path_variable(variable);
            spa_delivery(component, view.parentNode, view, controller);
        }
        else
            console.warn("Without view element to render");
    }
}

/**
 *
 * @param component
 * @param mounter
 */
export function router_listener_without_router(component:Component, mounter:HTMLElement):void
{
    if (mounter !== null) {
        let controller:ContextController = get_context_controller();
        spa_delivery(component, mounter.parentNode, mounter, controller);
    }
    else
        console.warn("Without mounter element to render");
}