import {PluginGeneric} from "../../../tension/generic/plugin/PluginGeneric";
import {Component} from "../../../index";

export interface RenderGeneric {

    use_plugin(plugin: PluginGeneric): void;

    add_tag(component:Component): void;

    listen(): void;

    render(component:Component, mounter:string): void;

    weave(mounter:string): void;
}