import {ContextController} from "../../system/define/ContextController";
import {
    directive_parse_collection_for_after,
    directive_parse_collection_for_before
} from "../../system/utility/cmdUtility";
import {archive_mount, extract_mount} from "../../system/lifecycle/mount";
import {
    inject_$name_to_data, inject_$plugin_to_config,
    inject_$props_to_data,
    inject_$refs_to_data,
    inject_computed_to_controller,
    inject_method_to_data,
    inject_watcher_to_controller,
} from "../../system/injection/inject";
import {after_process_for_init} from "../../system/lifecycle/lifeCycle";
import {findComponent} from "../delivery/delivery";
import {getTemplate} from "../../system/utility/templateUtility";
import {loader_tag_style} from "../../system/utility/styleUtility";
import {get_plugin_library, get_style_library} from "../../system/recorder/table0/system_func_0";
import {get_proxy_for_computed, get_proxy_for_method, get_proxy_for_watcher} from "../proxyer/getProxy";
import {
    getCodeSpaceForCommit,
    getCodeSpaceForPublish, getGetCodeSpaceForProperty,
    getSetCodeSpaceForProperty
} from "../../system/utility/injectUtility";
import {getCommitMethod, getGetterMethod, getPublishMethod, getSetterMethod} from "../../system/injection/injection";
import {Component} from "../../index";
import {parse_directive_salt_collect} from "../directive/salt/v-solt";

/**
 * 该函数用于处理需要更更新时候，需要从父组件提取数据状态的渲染操作
 * @param protoType
 * @param parent
 * @param child
 * @param parentController
 */
export function init_renderer(protoType:Component, parent:ParentNode, child:ChildNode, parentController:ContextController):void
{
    /* initiate the rang vars */
    let tagTemplate:Element = getTemplate(protoType);
    let currentController:ContextController = new ContextController({boxMode: true});

    /* some resolvers */
    parse_directive_salt_collect(child,currentController);

    /* some loaders */
    loader_tag_style(protoType.getName(), get_style_library());

    /* some injections to config class */
    Reflect.set(currentController.componentConfig, "$plugins", get_plugin_library());

    /* initiate to controller */
    currentController.parentController = parentController;
    currentController.prototypeOfComponent = protoType;
    currentController.componentConfig.boxMode = protoType.getConfig()["boxMode"];
    // @ts-ignore
    currentController.originalData = parentController.lazyComponent.get(child.getAttribute("name"));
    currentController.dataForMethod = get_proxy_for_method(currentController.originalData, currentController);
    currentController.dataForComputed = get_proxy_for_computed(currentController.originalData);
    currentController.dataForWatcher = get_proxy_for_watcher(currentController.originalData);

    /* inject to original data source */
    inject_$name_to_data(protoType.getName(), currentController.originalData);
    inject_$props_to_data(child, protoType.getProps() ,currentController.originalData);
    inject_$refs_to_data(tagTemplate, currentController.originalData);
    inject_$plugin_to_config(currentController.componentConfig);


    /* initiate method, computed, watcher */
    inject_method_to_data(currentController, protoType);
    inject_computed_to_controller(currentController, protoType);
    inject_watcher_to_controller(currentController, protoType);

    //注入commit
    getCodeSpaceForCommit(currentController.originalData, getCommitMethod(parentController));
    getCodeSpaceForPublish(currentController.originalData, getPublishMethod(currentController));
    getSetCodeSpaceForProperty(currentController.originalData, getSetterMethod(currentController));
    getGetCodeSpaceForProperty(currentController.originalData, getGetterMethod(currentController));

    protoType.getBeforeRender().apply(currentController.originalData, null);

    /* directive parse before */
    directive_parse_collection_for_before(tagTemplate, protoType, currentController);

    /* archive mount */
    archive_mount(currentController, protoType, parent, child, tagTemplate);

    /* directive parse after */
    directive_parse_collection_for_after(currentController.componentAttachedRootElement, currentController);

    protoType.getAfterRender().apply(currentController.dataForMethod, null);

    /* after process for render */
    after_process_for_init(currentController, child, parentController);

    /* find the next element to render */
    findComponent(currentController.componentAttachedRootElement.children, currentController);

    if (!protoType.getConfig()["boxMode"])
        /* extract mount */
        extract_mount(currentController)
}