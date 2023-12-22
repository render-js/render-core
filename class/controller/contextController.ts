import {status_read, status_write} from "../../index";

export class ContextController{

    private readonly fields:{};

    constructor() {
        this.fields = {};
    }

    public saveFields(fields:{}):void{

        for (let fieldsKey in fields) {

            if (Reflect.has(this.fields,fieldsKey)){

                console.log("This field is a system field, please have a new name for the field:"+fieldsKey);

            }else {

                Reflect.set(this.fields,fieldsKey,fields[fieldsKey]);
            }
        }
    }

    public loadFields():void{

        for (let fieldsKey in this.fields) {

            if (this.fields[fieldsKey].react){

                if (status_read({
                    type: "session",
                    fields:[fieldsKey]
                })[fieldsKey]){
                    this.fields[fieldsKey].data = status_read({
                        type: "session",
                        fields:[fieldsKey]
                    })[fieldsKey]["data"];
                }
            }

            if (this.fields[fieldsKey].down){
                // @ts-ignore
                this.fields[fieldsKey].callback(this.fields[fieldsKey]["data"],window.appSite)
            }
        }
    }

    public storeFields():void{
        for (let fieldsKey in this.fields) {
            let data = {};

            Reflect.set(data,fieldsKey,{
                data: this.fields[fieldsKey]["data"]
            });

            status_write({
                type: "session",
                fields:data
            })
        }
    }

    /**
     * 写入数据
     * @param field
     * @param value
     */
    public setField(field:string, value:any):void{

        let data = {};

        Reflect.set(data,field,{
            data: value
        });

        //写入数据
        status_write({
            type: "session",
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
}