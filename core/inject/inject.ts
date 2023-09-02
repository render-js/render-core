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

export function inject(controller:Controller,tagTemplate:Element):void{
    //注入props
    getCodeSpaceForProps(controller.raw_data,resolveProps(Reflect.get(window,"context").crtTag,controller.proto.getProps()));

    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolve_Queries());
}

export function injectRefs(controller:Controller,tagTemplate:Element):void{
    let refs = new Map<string,Element>();
    resolver_Refs(controller.root.children, refs);
    getCodeSpaceForRef(controller.raw_data,refs);
}

export function injectMethod(controller:Controller,proto:Component):void{
        let methods:string[] = Object.getOwnPropertyNames(proto.getMethods());
        methods.forEach(function (value) {
            Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.proxyForMethods));
        })
}

export function injectWatcher(controller:Controller,proto:Component):void{
    let methods:string[] = Object.getOwnPropertyNames(proto.getWatcher());
    methods.forEach(function (value) {
        Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.proxyForMethods));
    })
}

export function injectComputed(controller:Controller,proto:Component):void{
    let methods:string[] = Object.getOwnPropertyNames(proto.getComputed());
    methods.forEach(function (value) {
        Reflect.set(controller.raw_data,value,proto.getMethods()[value].bind(controller.proxyForMethods));
    })
}