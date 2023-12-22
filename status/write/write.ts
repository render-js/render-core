/**
 * This function is used to store the key-value to sessionStorage.
 * @param filed
 * @param fields
 */
export function sessionStorageEngin_write(filed:string, fields:{}):void
{
    if (sessionStorage.getItem(filed) !== null){
        switch (typeof fields[filed]) {
            case "string": sessionStorage.setItem(filed,fields[filed]);break;
            case "number": sessionStorage.setItem(filed,fields[filed]);break;
            case "boolean": sessionStorage.setItem(filed,fields[filed]);break;
            case "bigint": sessionStorage.setItem(filed,fields[filed]);break;
            case "object": sessionStorage.setItem(filed,JSON.stringify(fields[filed]));break
        }

    }else {
        console.warn("The sessionStorage has no key:"+filed+", which will be stored to sessionStorage!");
        switch (typeof fields[filed]) {
            case "string": sessionStorage.setItem(filed,fields[filed]);break;
            case "number": sessionStorage.setItem(filed,fields[filed]);break;
            case "boolean": sessionStorage.setItem(filed,fields[filed]);break;
            case "bigint": sessionStorage.setItem(filed,fields[filed]);break;
            case "object": sessionStorage.setItem(filed,JSON.stringify(fields[filed]));break
        }
    }
}

/**
 * This function is used to store the key-value to localStorage.
 * @param filed
 * @param fields
 */
export function localStorageEngine_write(filed:string,fields:{}):void
{
    if (localStorage.getItem(filed) !== null){
        switch (typeof fields[filed]) {
            case "string": localStorage.setItem(filed,fields[filed]);break;
            case "number": localStorage.setItem(filed,fields[filed]);break;
            case "boolean": localStorage.setItem(filed,fields[filed]);break;
            case "bigint": localStorage.setItem(filed,fields[filed]);break;
            case "object": localStorage.setItem(filed,JSON.stringify(fields[filed]));break
        }
    }else {
        console.warn("The localStorage has no key:"+filed+", which will be stored to localStorage!");
        switch (typeof fields[filed]) {
            case "string": localStorage.setItem(filed,fields[filed]);break;
            case "number": localStorage.setItem(filed,fields[filed]);break;
            case "boolean": localStorage.setItem(filed,fields[filed]);break;
            case "bigint": localStorage.setItem(filed,fields[filed]);break;
            case "object": localStorage.setItem(filed,JSON.stringify(fields[filed]));break
        }
    }
}