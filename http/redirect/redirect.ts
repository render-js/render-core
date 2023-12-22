/**
 * 资源定向
 * @param url
 * @param parameters
 */
export function redirect(url:string,parameters:{}):void{
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
export function locate(position:string):void{
    location.hash = position;
}