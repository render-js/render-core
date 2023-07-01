import {Component} from "../class/component";
import {isUnKnown} from "../core/utility/checkUtility";
import {resolver} from "../core/utility/miscUtility";

//检查元素是否为基元素
export function renderHtml(collection:HTMLCollection,tagLib:Map<string, Component>):void
{
    //遍历element节点，判断是否为自定义标签
    for (let i:number = 0; i < collection.length; i++)
    {
        if (isUnKnown(collection[i].nodeName.toUpperCase()))
        {
            //自定义标签
            resolver(collection[i],tagLib);
        }else {
            //非自定义标签，深度解析
            renderHtml(collection[i].children,tagLib);
        }
    }
}