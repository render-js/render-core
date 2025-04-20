/**
 * This func used to generate a new original data form prototype
 * @param data
 */
export function dataInject(data:{}):any
{
    let out:{} = {};
    let keys:string[] = Object.getOwnPropertyNames(data);

    keys.forEach(function (value) {
        out[value] = data[value];
    })

    return out;
}