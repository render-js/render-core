export function getGetter(data) {
    var getter = function (obj, prop) {
        return obj[prop];
    };
    return getter.bind(data);
}
