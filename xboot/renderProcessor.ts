import {ContextController} from "../system/prototype/ContextController";
import {get_tag_library} from "../system/recorder/table0/system_func_0";
import {Component} from "../index";
import {mpa_delivery} from "../kernel/delivery/delivery";
import {tag_unknown_check} from "../system/recorder/table2/system_func_2";

/**
 * This function is used to render element below the mount point.
 * @param collection
 * @param contextController
 */
export function renderHtml(collection:HTMLCollection, contextController:ContextController):void
{
    for (let i:number = 0; i < collection.length; i++)
    {
        if (tag_unknown_check(collection[i].nodeName.toUpperCase()))
        {
            let component:Component = get_tag_library().get(collection[i].nodeName.toUpperCase());
            if (typeof component === undefined)
                console.error(collection[i].nodeName.toUpperCase() + " can't be found in renderJs, you should firstly register in renderJs");
            else
                mpa_delivery(component, collection[i].parentNode, collection[i], contextController);
        }else
            renderHtml(collection[i].children,contextController);
    }
}