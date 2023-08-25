// @ts-ignore
import {status_write} from "render-status";
import {reloadStyle} from "../library/style/style";

export class App{
    constructor() {

    }

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