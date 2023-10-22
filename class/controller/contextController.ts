// @ts-ignore
import {status_read, status_write} from "render-status";
import {reloadStyle} from "../../core/utility/styleUtility";

export class ContextController{

    private fileds:{};

    constructor() {
        this.fileds = {
            system_theme:{
                data: "default",
                react: true,
                callback:function (value):void {
                    reloadStyle(value);
                }
            }
        };
    }

    public saveFileds(fileds:{}):void{

        for (let filedsKey in fileds) {

            if (Reflect.has(this.fileds,filedsKey)){

                console.log("This filed is a systemed filed, please have a new name for the filed:"+filedsKey);

            }else {

                Reflect.set(this.fileds,filedsKey,fileds[filedsKey]);
            }
        }
    }

    public loadFileds():void{

        for (let filedsKey in this.fileds) {

            if (this.fileds[filedsKey].react){

                if (status_read({
                    type: "session",
                    fields:[filedsKey]
                })[filedsKey]){
                    this.fileds[filedsKey].data = status_read({
                        type: "session",
                        fields:[filedsKey]
                    })[filedsKey];
                }
            }
        }
    }

    public storeFileds():void{
        for (let filedsKey in this.fileds) {

            let data = {};

            Reflect.set(data,filedsKey,this.fileds[filedsKey]);

            status_write({
                type: "session",
                fields:data
            })
        }
    }

    /**
     * 写入数据
     * @param filed
     * @param value
     */
    public setFiled(filed:string,value:any):void{

        let data = {};

        Reflect.set(data,filed,value);

        //写入数据
        status_write({
            type: "session",
            fields: data
        });

        //更新数据
        // @ts-ignore
        this.loadFileds();

        //数据回调
        if (this.fileds[filed]){
            // @ts-ignore
            this.fileds[filed].callback(value,window.appSite);
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
}