import {ContextController} from "../../system/prototype/ContextController";
import {
    directive_parse_collection_for_after,
    directive_parse_collection_for_before
} from "../../system/utility/directive/cmdUtility";
import {archive_mount, extract_mount} from "../../system/lifecycle/mount";
import {
    inject_$commit_to_data, inject_$getter_to_data,
    inject_$http_to_data,
    inject_$name_to_data, inject_$pathVariable_to_data, inject_$plugins_to_data,
    inject_$props_to_data, inject_$publish_to_data,
    inject_$refs_to_data, inject_$setter_to_data,
    inject_computed_to_controller,
    inject_method_to_data,
    inject_watcher_to_controller,
} from "../../system/injection/injector";
import {after_process_for_post} from "../../system/lifecycle/lifeCycle";
import {findComponent} from "../delivery/delivery";
import {parse_directive_salt_collect} from "../directive/salt/v-solt";
import {getTemplate} from "../../system/utility/initiate/templateUtility";
import {loader_tag_style} from "../../system/utility/style/styleUtility";
import {get_style_library} from "../../system/recorder/table0/system_func_0";
import {get_proxy_for_computed, get_proxy_for_method, get_proxy_for_watcher} from "../proxyer/getProxy";
import {dataInject} from "../../system/utility/data/dataUtility";
import {
    get_commit_method, get_getter_method,
    get_publish_method, get_setter_method
} from "../../system/injection/injection";
import {Component} from "../../index";

/**
 * 该函数用于处理需要更更新时候，需要从父组件提取数据状态的渲染操作
 * @param protoType
 * @param parent
 * @param child
 * @param parentController
 */
export function post_renderer(protoType:Component, parent:ParentNode, child:ChildNode, parentController:ContextController):void
{
    /* initiate the rang vars */
    let tagTemplate:Element = getTemplate(protoType);
    let currentController:ContextController = new ContextController({boxMode: true});

    /* some resolvers */
    parse_directive_salt_collect(child,currentController);

    /* some loaders */
    loader_tag_style(protoType.getName(), get_style_library());

    /* initiate to controller */
    currentController.parentController = parentController;
    currentController.prototypeOfComponent = protoType;
    currentController.componentConfig.boxMode = protoType.getConfig()["boxMode"];
    // @ts-ignore
    currentController.originalData = dataInject(protoType.getData());
    currentController.dataForMethod = get_proxy_for_method(currentController.originalData, currentController);
    currentController.dataForComputed = get_proxy_for_computed(currentController.originalData);
    currentController.dataForWatcher = get_proxy_for_watcher(currentController.originalData);

    /* inject to original data source */
    inject_$name_to_data(protoType.getName(), currentController.originalData);
    inject_$props_to_data(child, protoType.getProps() ,currentController.originalData);
    inject_$refs_to_data(tagTemplate, currentController.originalData);
    inject_$plugins_to_data(currentController.originalData);
    inject_$http_to_data(currentController.originalData);
    inject_$pathVariable_to_data(currentController.originalData);
    inject_$commit_to_data(currentController.originalData,get_commit_method(currentController));
    inject_$publish_to_data(currentController.originalData,get_publish_method(currentController));
    inject_$setter_to_data(currentController.originalData,get_setter_method(currentController));
    inject_$getter_to_data(currentController.originalData,get_getter_method(currentController));

    /* initiate method, computed, watcher */
    inject_method_to_data(currentController, protoType);
    inject_computed_to_controller(currentController, protoType);
    inject_watcher_to_controller(currentController, protoType);

    protoType.getBeforeRender().apply(currentController.originalData, null);

    /* directive parse before */
    directive_parse_collection_for_before(tagTemplate, protoType, currentController);

    /* archive mount */
    archive_mount(currentController, protoType, parent, child, tagTemplate);

    /* directive parse after */
    directive_parse_collection_for_after(currentController.componentAttachedRootElement, currentController);

    protoType.getAfterRender().apply(currentController.dataForMethod, null);

    /* after process for render */
    after_process_for_post(currentController, parentController);

    /* find the next element to render */
    findComponent(currentController.componentAttachedRootElement.children,currentController);

    if (!protoType.getConfig()["boxMode"])
        /* extract mount */
        extract_mount(currentController)
}