import {changeStyle, changeTheme} from "../../system/utility/styleUtility";
import {redirect, relocate} from "../../system/http/Http";
import {HooksGeneric} from "../generic/HooksGeneric";

export class HooksAction implements HooksGeneric{

    //文档hash定位
    public relocate(position: string): void {
        relocate(position);
    }

    //文档URL跳转
    public redirect(url: string, parameters: {}): void {
        redirect(url, parameters);
    }

    //更改tag样式
    public changeStyle(tag:string, theme:string):void{
        changeStyle(tag, theme);
    }

    //更改主题样式
    public changeTheme(theme:string):void{
        changeTheme(theme);
    }
}