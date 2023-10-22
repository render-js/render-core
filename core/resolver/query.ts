/**
 * This function is used to resolve the http parameters.
 */
export function resolve_Queries():Map<string, any>
{
    let query:Map<string, any> = new Map<string, any>();

    if (location.search !== ""){

        let parameters:string = location.search.replace("?","")

        let listPara:string[] = parameters.split("&")

        listPara.forEach(function (value:string):void{

            let results:string[] = value.split("=")

            query.set(results[0],results[1]);
        })
    }

    return query;
}