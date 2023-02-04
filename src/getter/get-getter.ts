export function getGetter(data:{}){

    let getter = function (obj,prop){
        return obj[prop]
    }
    return getter.bind(data)
}