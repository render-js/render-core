import {Component} from "../../../../index";

export interface HooksGeneric{

    //更改标签样式
    changeStyle(tag:string, theme:string):void;

    //更改主题样式
    changeTheme(theme:string):void;

    directDelivery(component:Component):void;
}