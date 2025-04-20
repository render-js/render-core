import system_t_0 from "./system_t_0";
import {Component} from "../../../index";
import {ContextController} from "../../prototype/ContextController";

/**
 * Use the func to inject a tag component to the tag-library.
 * @param tagName The tag name
 * @param tagDefine The tag prototype class
 */
export function tag_library_inject(tagName:string, tagDefine:Component):void
{
    if (system_t_0.tagLib.has(tagName))
        console.log("no");
    else
        system_t_0.tagLib.set(tagName, tagDefine);
}

/**
 * Use the func to get a tag prototype class
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