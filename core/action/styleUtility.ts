export function checkStyleLabel(tag:string):boolean
{
    let styles:HTMLCollection = document.getElementsByTagName("style");

    for (let i:number = 0; i < styles.length; i++)
    {
        if (styles[i].getAttribute("tag") === tag)
            return true;
    }
    return false;
}