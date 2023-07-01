export function getCodeSpace(data:{},inject:{$props:{},$query:{}}):void
{
    Reflect.set(data,"$props",inject.$props);
    Reflect.set(data,"$query",inject.$query);
}

export function getCodeSpaceForRef(data:{},inject:{$ref:Map<string, Element>}):void
{
    Reflect.set(data,"$refs",inject.$ref);
}

export function getApiCodeSpace(data:{},method:{}):void
{
    let list:string[] = Object.getOwnPropertyNames(method);

    list.forEach(function (value:string):void{
        Reflect.set(data,value,method[value].bind(data));
    })
}