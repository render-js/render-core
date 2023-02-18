import {Page} from "./render";
import {Partial} from "./partial";

export class VPage{

    root:ParentNode;

    owner:Page | Partial

    data:object;
}