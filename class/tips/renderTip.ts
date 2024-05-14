import {RenderJS} from "../../index";

export interface RenderTip{
    use(callable:(render:RenderJS)=>void):void;
}