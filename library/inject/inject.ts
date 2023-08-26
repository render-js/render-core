import {
    getCodeSpaceForProps,
    getCodeSpaceForQuery,
    getCodeSpaceForRef,
} from "../../core/utility/injectUtility";
import {resolveProps} from "../../core/resolver/props";
import {resolve_Queries} from "../../core/resolver/query";
import {resolver_Refs} from "../../core/cmd/v-ref";
import {Controller} from "../../class/controller";
import {Component} from "../../class/component";

export function inject(controller:Controller,tagTemplate:Element):void{
    //注入props
    getCodeSpaceForProps(controller.raw_data,resolveProps(Reflect.get(window,"context").crtTag,controller.proto.getProps()));
    //注入query
    getCodeSpaceForQuery(controller.raw_data,resolve_Queries());
}

export function injectProps(controller:Controller,tagTemplate:Element):void{
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