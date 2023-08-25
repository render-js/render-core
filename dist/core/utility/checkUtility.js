import metaTagLib from "../../runtime/database/metaTagLib";
export function isUnKnown(element) {
    return !metaTagLib.some(function (ele) { return ele == element; });
}
