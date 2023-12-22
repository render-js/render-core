import {changeStyle, changeTheme} from "../core/utility/styleUtility";
import {AppController} from "../class/controller/appController";
import {ContextController} from "../class/controller/contextController";

/**
 *
 * @param tag
 * @param theme
 */
export function changeTagTheme(tag:string, theme:string):void{
    changeStyle(tag,theme);
}

/**
 *
 * @param theme
 */
export function changeSessionTheme(theme:string):void{

    let application:ContextController = Reflect.get(window,"context");

    application.setField("system_theme",theme);

    changeTheme(application.getField("system_theme"));
}

/**
 *
 * @param theme
 */
export function changeApplicationTheme(theme:string):void{

    let application:AppController = Reflect.get(window,"appSite");

    application.setField("system_theme",theme);

    changeTheme(application.getField("system_theme"));
}