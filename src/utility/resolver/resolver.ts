import {Router} from "../../router/router";

export function resolveRoute(router:Router,routeName:string) {

    if (router.resolveRender(routeName) !== null){

        return router.resolveRender(routeName);
    }
    return "404"
}