interface RouterBase{
    resolveRender(path:string):string | null
}

export class Router implements RouterBase{
    private readonly routes:{
        path:string,
        render: string,
        beforeEnter?:()=>{}
    }[];

    private beforeEach:()=>{};

    constructor(config:{
        routes: {
            path: string,
            render: string,
            beforeEnter?:()=>{}
        }[],
        beforeEach?:()=>{},
    }) {
        this.routes = config.routes;
        this.beforeEach = config.beforeEach;
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