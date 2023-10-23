// @ts-ignore
import {status_read, status_write} from "render-status";
import {AppTip} from "../tips/appTip";
import {locate, redirect} from "../../http/redirect/redirect";

/**
 * This class is associated with localStorage.
 */
export class AppController implements AppTip{

    //内部数据库
    private fileds:{};

    //系统变量
    constructor() {
        this.fileds = {
            system_theme:{
                data: "default",
                react: true,
                callback:function (value,context):void{
                    context.setFiled("system_theme",value);
                }
            }
        };
    }

    /**
     * This method is used to add customed data.
     * @param fileds
     */
    public saveFileds(fileds:{}):void{

        for (let filedsKey in fileds) {

            if (Reflect.has(this.fileds,filedsKey)){

                console.log("This filed is a systemed filed, please have a new name for the filed:"+filedsKey);
            }else {

                Reflect.set(this.fileds,filedsKey,fileds[filedsKey]);
            }
        }
    }

    /**
     * 更新数据
     * @private
     */
    public loadFileds():void{

        for (let filedsKey in this.fileds) {

            if (this.fileds[filedsKey].react){
                if (status_read({
                    type: "local",
                    fields:[filedsKey]
                })[filedsKey]){
                    this.fileds[filedsKey].data = status_read({
                        type: "local",
                        fields:[filedsKey]
                    })[filedsKey];
                }
            }
        }
    }

    /**
     * store fileds
     */
    public storeFileds():void{
        for (let filedsKey in this.fileds) {

            let data = {};

            Reflect.set(data,filedsKey,this.fileds[filedsKey]);

            status_write({
                type: "local",
                fields:data
            })
        }
    }

    public setFiled(filed:string,value:any):void{
        let data = {};
        Reflect.set(data,filed,value);

        //写入数
        status_write({
            type: "local",
            fields: data
        });

        //更新数据
        this.loadFileds();

        //执行回调
        if (this.fileds[filed].callback){
            // @ts-ignore
            this.fileds[filed].callback(value,window.context);
        }
    }

    /**
     * 获取数据
     * @param filed
     */
    public getFiled(filed:string):any{

        if (this.fileds[filed]){

            return this.fileds[filed].data;

        }else {
            return null;
        }
    }

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