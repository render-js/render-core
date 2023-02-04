interface UpdaterBase{
    getRootNode():ChildNode;
    getComponentCollection(key:string):ChildNode[];
}