import {Router} from "./router";
import {loadPage} from "../utility/request/request";
import {RenderJs} from "./renderjs";


interface AppBase{
    run():void
    useRouter(config:Router):void
}

export class Shell implements AppBase{

    private readonly Renderjs:RenderJs;

    constructor(config:{
        mount:string
    })
    {
        this.Renderjs = new RenderJs(config);
    }

    useRouter(router:Router): void {
        this.Renderjs.router = router;
    }

    run(): void {
        //注册Renderjs到window
        window["Renderjs"] = this.Renderjs;
        window.onload = loadPage.bind(this.Renderjs);
    }
}