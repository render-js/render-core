//注入对象
export function getCodeSpaceForCommit(data:{},commit:any):void
{
    Reflect.set(data,"$commit",commit);
}


//注入对象
export function getCodeSpaceForPublish(data:{}, publisher:any):void
{
    Reflect.set(data,"$publish",publisher);
}

export function getSetCodeSpaceForProperty(data:{}, setter:any):void
{
    Reflect.set(data,"$set",setter);
}

export function getGetCodeSpaceForProperty(data:{}, getter:any):void
{
    Reflect.set(data,"$get",getter);
}
