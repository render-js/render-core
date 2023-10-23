/**
 * 资源定向
 * @param url
 * @param parameters
 */
export function redirect(url:string,parameters:{}):void{
    if (parameters !== null){
        let params:string[] = Object.getOwnPropertyNames(parameters);

        if (params.length !== 0){
            let querys = "";

            params.forEach(function (value) {
                if (querys === ""){
                    querys = querys + value + "=" + parameters[value].toString();
                }else {
                    querys = querys + "&" + value + "=" + parameters[value].toString();
                }
            })
            querys = encodeURI(querys);

            location.href = url + "?" + querys;
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
export function locate(position:string):void{
    location.hash = position;
}