import {AppTip} from "../tips/appTip";
import {locate, redirect} from "../../http/redirect/redirect";

/**
 * This class is associated with localStorage.
 */
export class AppController implements AppTip{
    /**
     * 资源定向
     * @param url
     * @param parameters
     */
    public redirect(url:string,parameters:{}):void{
        redirect(url,parameters);
    }

    /**
     * 位置定位
     * @param position
     */
    public locate(position:string):void{
        locate(position);
    }
}