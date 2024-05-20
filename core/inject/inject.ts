import {
    getCodeSpaceForProps,
    getCodeSpaceForQuery,
    getCodeSpaceForRef,
} from "../utility/injectUtility";
import {resolveProps} from "../resolver/props";
import {resolve_Queries} from "../resolver/query";
import {resolver_Refs} from "../cmd/ref/v-ref";
import {ComponentController} from "../../class/component/componentController";
import {Component} from "../../class/component/component";

/**
 * 向raw_data中注入props和Query
 * @param controller
 */
export function inject(controller:ComponentController):void{
    //注入name
    Reflect.set(controller.raw_data,"$name",controller.proto.getName());

    //注入props
    getCodeSpaceForProps(controller.raw_data,resolveProps(Reflect.get(window,"context").crtTag,controller.proto.getProps()));

    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolve_Queries());
}

/**
 *
 * @param controller
 */
export function injectRefs(controller:ComponentController):void{

    let refs:Map<string, Element> = new Map<string,Element>();

    resolver_Refs(controller.root.children, refs);

    getCodeSpaceForRef(controller.raw_data,refs);
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectMethod(controller:ComponentController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getMethods());

    methods.forEach(function (value:string):void {
        if (value.match(/^\$\$[a-zA-Z0-9_]*/) !== null){
            Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.raw_data));
        }else {
            Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.proxyForMethods));
        }
    })
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectWatcher(controller:ComponentController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getWatcher());

    methods.forEach(function (value:string):void {

        Reflect.set(controller.watcher,value,proto.getWatcher()[value].bind(controller.raw_data));
    })
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectComputed(controller:ComponentController, proto:Component):void{

    let methods:string[] = Object.getOwnPropertyNames(proto.getComputed());

    methods.forEach(function (value:string):void {

        Reflect.set(controller.computed,value,proto.getComputed()[value].bind(controller.raw_data));
    })
}