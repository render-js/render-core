interface RouterBase{

}

export class Router implements RouterBase{
    constructor(config:{
        routes: {
            path:string,
            render: string,
            meta: {},
            beforeEnter:()=>{}
        }[],
        beforeEach:()=>{},
        http:{}
    }) {
    }
}