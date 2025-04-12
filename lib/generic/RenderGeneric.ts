import {AbstractPlugin} from "render-refer";

export interface RenderGeneric{

    use(plugin:AbstractPlugin):void;

    run():void;
}