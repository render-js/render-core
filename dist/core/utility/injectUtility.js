export function getCodeSpaceForProps(data, $props) {
    Reflect.set(data, "$props", $props);
}
export function getCodeSpaceForQuery(data, $query) {
    Reflect.set(data, "$queries", $query);
}
//注入对象
export function getCodeSpaceForRef(data, $ref) {
    Reflect.set(data, "$refs", $ref);
}
export function getCommitMethod(controller) {
    var commit = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.receiver(method, args);
    };
    return commit.bind(controller);
}
//注入对象
export function getCodeSpaceForCommit(data, commit) {
    Reflect.set(data, "$commit", commit);
}
export function getPublishMethod(controller) {
    var publisher = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < this.to.length; i++) {
            this.to[i].receiver(method, args);
        }
    };
    return publisher.bind(controller);
}
//注入对象
export function getCodeSpaceForPublish(data, publisher) {
    Reflect.set(data, "$publish", publisher);
}
