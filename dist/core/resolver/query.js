export function resolve_Queries() {
    var query = new Map();
    if (location.search !== undefined) {
        var parameters = location.search.replace("?", "");
        var listPara = parameters.split("&");
        listPara.forEach(function (value) {
            var results = value.split("=");
            Reflect.set(query, results[0], results[1]);
        });
    }
    return query;
}
