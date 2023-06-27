export function getCodeSpace(data:{},inject:{$props:{},$query:{}}):void
{
    Reflect.set(data,"$props",inject.$props);
    Reflect.set(data,"$query",inject.$query);
}

export function getApiCodeSpace(data:{},method:{}):void
{
    let list:string[] = Object.getOwnPropertyNames(method);

    list.forEach(function (value:string):void{
        Reflect.set(data,value,method[value].bind(data));
    })
}