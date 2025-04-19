import system_t_0 from "./system_t_0";
import {AbstractPlugin, Component} from "../../../index";
import {ContextController} from "../../define/ContextController";
import {AbstractRouter} from "../../../tension/prototype/AbstractRouter";

/**
 * Use the func to inject a tag component to the tag-library.
 * @param tagName The tag name
 * @param tagDefine The tag define class
 */
export function tag_library_inject(tagName:string, tagDefine:Component):void
{
    if (system_t_0.tagLib.has(tagName))
        console.log("no");
    else
        system_t_0.tagLib.set(tagName, tagDefine);
}

/**
 * Use the func to get a tag define class
 * @param tagName The name of tag you want to search
 */
export function tag_library_search(tagName:string):Component | null
{
    if (system_t_0.tagLib.has(tagName))
        return system_t_0.tagLib.get(tagName);
    else
        return null;
}

/**
 * From the system_t_0 table, get tag library
 */
export function get_tag_library():Map<string, Component>
{
    return system_t_0.tagLib;
}

/**
 * From the system_t_0 table, get style library
 */
export function get_style_library():Map<string, Map<string, string>>
{
    return system_t_0.styleLib;
}

/**
 * Set plugin to system_t_0
 */
export function set_plugin_library(name:string, plugin:AbstractPlugin):void
{
    Reflect.get(system_t_0, "extendLib").set(name, plugin);
}

/**
 * From the system_t_o table, get plugin library
 */
export function get_plugin_library():Map<string, AbstractPlugin>
{
    return system_t_0.extendLib;
}

/**
 * Get context controller from system_t_0
 */
export function get_context_controller():ContextController
{
    return system_t_0.contextController;
}

/**
 * Set context controller to system_t_0
 * @param context
 */
export function set_context_controller(context:ContextController):void
{
    Reflect.set(system_t_0,"contextController",context);
}

/**
 * Get router from system_t_0
 */
export function get_router_for_application():AbstractRouter
{
    return system_t_0.router;
}

/**
 * Set router for system_t_0
 */
export function set_router_for_application(router:AbstractRouter):void
{
    Reflect.set(system_t_0, "router", router);
}