import {relocate,redirect} from "../../../http/Http";


/**
* This proto is associated with localStorage.
*/
export class AppController{
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
        relocate(position);
    }
}
