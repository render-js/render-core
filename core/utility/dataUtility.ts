export function dataInject(data:{}):any{
    let out = {};
    let keys = Object.getOwnPropertyNames(data);
    keys.forEach(function (value) {
        out[value] = data[value];
    })

    return out;
}