import {AppTip} from "../tips/appTip";
import {locate, redirect} from "../../http/redirect/redirect";
import {status_read, status_write} from "../../index";


/**
 * This class is associated with localStorage.
 */
export class AppController implements AppTip{

    //内部数据库
    private readonly fields:{};

    //系统变量
    constructor() {
        this.fields = {
            system_theme: {
                data: "default",
                react: true,
                push: true,
                callback:function (value, context){
                    context.saveFields({
                        "system_theme":{
                            data: value,
                            react: true,
                            down: false
                        }
                    });
                    context.storeFields();
                    context.loadFields();
                }
            }
        };
    }

    /**
     * This method is used to add custom data.
     * @param fields
     */
    public saveFields(fields:{}):void{

        for (let fieldsKey in fields) {

            if (Reflect.has(this.fields,fieldsKey)){

                console.log("This filed is a system filed, please have a new name for the filed:"+fieldsKey);
            }else {

                Reflect.set(this.fields,fieldsKey,fields[fieldsKey]);
            }
        }
    }

    /**
     * 更新数据
     * @private
     */
    public loadFields():void{

        for (let fieldsKey in this.fields) {

            if (this.fields[fieldsKey].react){
                if (status_read({
                    type: "local",
                    fields:[fieldsKey]
                })[fieldsKey]){
                    this.fields[fieldsKey].data = status_read({
                        type: "local",
                        fields:[fieldsKey]
                    })[fieldsKey]["data"];
                }
            }

            if (this.fields[fieldsKey].push){
                // @ts-ignore
                this.fields[fieldsKey].callback(this.fields[fieldsKey]["data"],window.context);
            }
        }
    }

    /**
     * store fields
     */
    public storeFields():void{
        for (let fieldsKey in this.fields) {

            if (!status_read({
                type: "local",
                fields:[fieldsKey]
            })[fieldsKey]){
                let data = {};

                Reflect.set(data,fieldsKey,{
                    data: this.fields[fieldsKey]["data"]
                });

                status_write({
                    type: "local",
                    fields:data
                })
            }
        }
    }

    /**
     *
     * @param field
     * @param value
     */
    public setField(field:string,value:any):void{

        let data = {};
        Reflect.set(data,field,{
            data: value
        });

        //写入数
        status_write({
            type: "local",
            fields: data
        });

        //更新数据
        this.loadFields();
    }

    /**
     * 获取数据
     * @param field
     */
    public getField(field:string):any{

        if (this.fields[field]){

            return this.fields[field].data;

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