import {changeStyle, changeTheme} from "../../system/utility/style/styleUtility";
import {HooksGeneric} from "../generic/plugin/hooks/HooksGeneric";
import {Component} from "../../index";
import {direct_delivery} from "../../kernel/delivery/delivery";

export class HooksAction implements HooksGeneric{

    //更改tag样式
    public changeStyle(tag:string, theme:string):void{
        changeStyle(tag, theme);
    }

    //更改主题样式
    public changeTheme(theme:string):void{
        changeTheme(theme);
    }

    directDelivery(component: Component): void {
        direct_delivery(component);
    }
}