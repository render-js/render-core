/**
 * This function is used to get value from sessionStorage.
 * @param filed
 */
export function sessionStorageEngin_read(filed:string):any
{
    if (sessionStorage.getItem(filed) !== null){
        return JSON.parse(sessionStorage.getItem(filed));
    }else {
        console.warn("The sessionStorage has not init the key:"+filed);
        return null;
    }
}

/**
 * This function is used to get value from localStorage.
 * @param filed
 */
export function localStorageEngine_read(filed:string):any
{
    if (localStorage.getItem(filed) !== null){
        return JSON.parse(localStorage.getItem(filed));
    }else {
        console.warn("The localStorage has not init the key:"+filed);
        return null;
    }
}