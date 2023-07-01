//注入对象
export function getCodeSpaceForProps(data:{},$props:{}):void
{
    Reflect.set(data,"$props",$props);
}

export function getCodeSpaceForQuery(data:{},$query:{}):void
{
    Reflect.set(data,"$query",$query);
}

//注入对象
export function getCodeSpaceForRef(data:{},$ref:Map<string, Element>):void
{
    Reflect.set(data,"$refs",$ref);
}



//注入对象
export function getApiCodeSpace(data:{},method:{}):void
{
    let list:string[] = Object.getOwnPropertyNames(method);

    list.forEach(function (value:string):void{
        Reflect.set(data,value,method[value].bind(data));
    })
}

export function getCommitDataMethod():any
{

}