interface RouterBase{
    resolveRender(path:string):string | null
}

export class Router implements RouterBase{
    private readonly routes:{
        path:string,
        render: string,
        meta?: {},
        beforeEnter?:()=>{}
    }[];

    private beforeEach:()=>{};


    private http:{};

    constructor(config:{
        routes: {
            path: string,
            render: string,
            meta?: {},
            beforeEnter?:()=>{}
        }[],
        beforeEach?:()=>{},
        http?:{}
    }) {
        this.routes = config.routes;
        this.beforeEach = config.beforeEach;
        this.http = config.http;
    }

    resolveRender(path: string): string | null {
        for (let route of this.routes) {
            if (route.path === path){
                return route.render;
            }
        }
        return null;
    }
}