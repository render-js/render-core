import {loadPage} from "./src/libloader";

function createApp(config:{
    name:string
}){
    // @ts-ignore
    window.onload = loadPage
}

createApp({name:"app"})