import {Component} from "render-refer";
import {RenderJS} from "../index";

/**
 * This function is used to save the prototype component proto in the window object.
 * So, you can hava a tip that we custom a property named 'tagLib' in the window object.
 * @param application
 * @param component
 */
export function registerTagLib(application:RenderJS, component:Component | Component[]):void{

    if(Array.isArray(component)){
        //if the input parameter is an array of Component,do the code block.
        component.forEach(component =>{
            if (!application.tagLib.has(component.getName().toUpperCase()))
            {
                application.tagLib.set(component.getName().toUpperCase(),component)
            }else {
                console.warn("The Tag:" + component.getName().toUpperCase() + "has been registered!")
            }
        })
    }else{
        if (!application.tagLib.has(component.getName().toUpperCase()))
        {
            application.tagLib.set(component.getName().toUpperCase(),component)
        }else {
            console.warn("The Tag:"+component.getName().toUpperCase()+"has been registered!")
        }
    }
}