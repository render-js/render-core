import {resolve_props} from "../resolver/props";
import {ContextController} from "../prototype/ContextController";
import {parse_directive_refs} from "../../kernel/directive/ref/v-ref";
import {Component} from "../../index";
import {get_user_anonymous_ext, get_user_ext_http} from "../recorder/table3/system_func_3";
import {get_path_variable} from "../recorder/table1/system_func_1";

/**
 *
 * @param name
 * @param origin
 */
export function inject_$name_to_data(name:string, origin:{}):void
{
    Reflect.set(origin, "$name", name);
}

/**
 *
 * @param childNode
 * @param meta
 * @param origin
 */
export function inject_$props_to_data(childNode:ChildNode, meta:{} | [], origin:object):void
{
    let props:Map<string, string> = resolve_props(childNode, meta);
        Reflect.set(origin, "$props", props);
}

/**
 *
 * @param template
 * @param origin
 */
export function inject_$refs_to_data(template:Element, origin:object):void
{
    let refs:Map<string, Element> = new Map<string,Element>();
        parse_directive_refs(template.children, refs);
        Reflect.set(origin, "$refs", refs);
}

/**
 *
 * @param config
 */
export function inject_$plugins_to_data(config:object):void
{
    Reflect.set(config, "$plugins", function (name:string):any{
        return  get_user_anonymous_ext(name);
    });
}

/**
 *
 * @param origin
 */
export function inject_$http_to_data(origin:{}):void
{
    Reflect.set(origin, "$http", get_user_ext_http());
}

/**
 *
 * @param origin
 */
export function inject_$pathVariable_to_data(origin:{}):void
{
    Reflect.set(origin, "$pathVariable", get_path_variable());
}

/**
 *
 * @param data
 * @param commit
 */
export function inject_$commit_to_data(data:{}, commit:any):void
{
    Reflect.set(data,"$commit",commit);
}


/**
 *
 * @param data
 * @param publisher
 */
export function inject_$publish_to_data(data:{}, publisher:any):void
{
    Reflect.set(data,"$publish",publisher);
}

/**
 *
 * @param data
 * @param setter
 */
export function inject_$setter_to_data(data:{}, setter:any):void
{
    Reflect.set(data,"$set",setter);
}

/**
 *
 * @param data
 * @param getter
 */
export function inject_$getter_to_data(data:{}, getter:any):void
{
    Reflect.set(data,"$get",getter);
}


/**
 *
 * @param controller
 * @param proto
 */
export function inject_method_to_data(controller:ContextController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getMethods());
        methods.forEach(function (value:string):void
            {
                if (value.match(/^\$\$[a-zA-Z0-9_]*/) !== null)
                    Reflect.set(controller.originalData, value,proto.getMethods()[value].bind(controller.originalData));
                else
                    Reflect.set(controller.originalData, value,proto.getMethods()[value].bind(controller.dataForMethod));
            }
        )
}

/**
 *
 * @param controller
 * @param proto
 */
export function inject_watcher_to_controller(controller:ContextController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getWatcher());
        methods.forEach(function (value:string):void
            {
                Reflect.set(controller.watcher,value,proto.getWatcher()[value].bind(controller.originalData));
            }
        )
}

/**
 *
 * @param controller
 * @param proto
 */
export function inject_computed_to_controller(controller:ContextController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getComputed());
        methods.forEach(function (value:string):void
            {
                Reflect.set(controller.computed,value,proto.getComputed()[value].bind(controller.originalData));
            }
        )
}