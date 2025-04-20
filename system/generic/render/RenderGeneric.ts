import {AbstractPlugin} from "../../index";

export interface RenderGeneric{
    use_plugin(plugin:AbstractPlugin):void;
}