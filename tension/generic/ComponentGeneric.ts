export interface ComponentGeneric{
        getName():string;
        getTemplate():string;
        getConfig():{};
        getBoxStyle(): string;
        getProps(): {};
        getData():{};
        getComputed():{};
        getMethods():{};
        getWatcher():{};
        getBeforeRender():()=>void
        getAfterRender():()=>void
}
