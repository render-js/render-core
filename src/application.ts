import {Router} from "./router/router";
import {loadPage} from "./utility/utility";

interface AppBase{
    run():void
    useRouter(config:Router):void
}

export class Application implements AppBase{

    private router:Router

    constructor() {

    }

    run(): void {
        window.onload = loadPage.bind(this)
    }

    useRouter(config:Router): void {
        this.router = config
    }
}