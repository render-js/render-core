import {Component} from "../index";
import {get_tag_library} from "../system/recorder/table0/system_func_0";

/**
 * This function is used to save the prototype component proto in the window object.
 * So, you can hava a tip that we custom a property named 'tagLib' in the window object.
 * @param component
 */
export function registerTagLib(component:Component | Component[]):void
{
    if(Array.isArray(component))
    {
        component.forEach(component =>{
            if (!get_tag_library().has(component.getName().toUpperCase()))
                get_tag_library().set(component.getName().toUpperCase(),component)
            else
                console.warn("The Tag:" + component.getName().toUpperCase() + "has been registered!")
        })
    }
    else
    {
        if (!get_tag_library().has(component.getName().toUpperCase()))
            get_tag_library().set(component.getName().toUpperCase(),component)
        else
            console.warn("The Tag:" + component.getName().toUpperCase() + "has been registered!")
    }
}