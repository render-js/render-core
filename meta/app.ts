// @ts-ignore
import {status_write} from "render-status";
import {reloadStyle} from "../core/utility/styleUtility";

export class App{
    //更改会话样式
    public setTheme(theme:string):void{
        status_write({
            type: "session",
            fields: {
                theme: theme
            }
        });
        reloadStyle(theme);
    }
}