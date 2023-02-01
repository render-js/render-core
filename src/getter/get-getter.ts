export function getGetter(obj){
    let getter = function (){

    }
    return getter.bind(obj)
}