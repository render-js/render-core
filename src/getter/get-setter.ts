export function getSetter(obj){
    let setter = function (value){
    }
    return setter.bind(obj)
}