import {
    getCodeSpaceForProps,
    getCodeSpaceForQuery,
    getCodeSpaceForRef,
} from "../utility/injectUtility";
import {resolveProps} from "../resolver/props";
import {resolve_Queries} from "../resolver/query";
import {resolver_Refs} from "../cmd/v-ref";
import {Controller} from "../../class/controller/controller";
import {Component} from "../../class/component/component";

/**
 * 向raw_data中注入props和Query
 * @param controller
 * @param tagTemplate
 */
export function inject(controller:Controller,tagTemplate:Element):void{
    //注入props
    getCodeSpaceForProps(controller.raw_data,resolveProps(Reflect.get(window,"context").crtTag,controller.proto.getProps()));

    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolve_Queries());
}

/**
 *
 * @param controller
 * @param tagTemplate
 */
export function injectRefs(controller:Controller,tagTemplate:Element):void{
    let refs = new Map<string,Element>();
    resolver_Refs(controller.root.children, refs);
    getCodeSpaceForRef(controller.raw_data,refs);
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectMethod(controller:Controller,proto:Component):void{
        let methods:string[] = Object.getOwnPropertyNames(proto.getMethods());
        methods.forEach(function (value) {
            Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.proxyForMethods));
        })
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectWatcher(controller:Controller,proto:Component):void{
    let methods:string[] = Object.getOwnPropertyNames(proto.getWatcher());
    methods.forEach(function (value) {
        Reflect.set(controller.raw_data,value,proto.getWatcher()[value].bind(controller.raw_data));
    })
}

/**
 *
 * @param controller
 * @param proto
 */
export function injectComputed(controller:Controller,proto:Component):void{
    let methods:string[] = Object.getOwnPropertyNames(proto.getComputed());
    methods.forEach(function (value) {
        Reflect.set(controller.raw_data,value,proto.getComputed()[value].bind(controller.proxyForMethods));
    })
}