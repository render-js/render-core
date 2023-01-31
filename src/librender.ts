import {findComponent} from "./component";

function renderPage(page:{
    name:string,
    template:string,
    components: object,
    methods: object,
    watchers: object,
    computed: object,
    beforeRender: ()=>{},
    afterRender: ()=>{}
}){
    let root:any = document.getElementById("app")
    root.innerHTML = page.template
    let nodes =root.children
    let components = Object.keys(page.components)
    findComponent(nodes, components, page)
}


export function renderComponent(component:{
    name:string,
    template:string,
    components: object,
    methods: object,
    watchers: object,
    computed: object,
    beforeRender: ()=>{},
    afterRender: ()=>{}
},parent:any,child:any){
    let element = document.createElement("div")
    element.innerHTML = component.template
    parent.replaceChild(element,child)
    let nodes =element.children
    let components = Object.keys(component.components)
    findComponent(nodes,components,component)
}