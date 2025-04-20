import {HttpGeneric} from "../generic/http/HttpGeneric";

export class HttpAction implements HttpGeneric{

    public redirect(url:string,parameters:{}):void{
        if (parameters !== null){
            let params:string[] = Object.getOwnPropertyNames(parameters);
            if (params.length !== 0){
                let queries = "";
                params.forEach(function (value) {
                    if (queries === ""){
                        queries = queries + value + "=" + parameters[value].toString();
                    }else {
                        queries = queries + "&" + value + "=" + parameters[value].toString();
                    }
                })
                queries = encodeURI(queries);
                location.href = url + "?" + queries;
            }else {
                location.href = url;
            }
        }else {
            location.href = url;
        }
    }

    /**
     * locate the position
     * @param position
     */
    public relocate(position:string):void{
        location.hash = position;
    }

}