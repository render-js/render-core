import {Router} from "./router/router";
import {loadPage} from "./utility/request/request";


interface AppBase{
    run():void
    useRouter(config:Router):void
}

export class Application implements AppBase{

    private router:Router

    private selector:string

    constructor(config:{
        selector:string
    }) {
        this.selector = config.selector
    }

    run(): void {
        window.onload = loadPage.bind(this)
    }

    useRouter(config:Router): void {
        this.router = config
    }
}