import {add_label_to_element} from "../initiate/miscUtility";
import {parse_directive_event} from "../../../kernel/directive/method/v-on";
import {parse_directive_html} from "../../../kernel/directive/data/v-html";
import {parse_directive_txt} from "../../../kernel/directive/data/v-txt";
import {parse_directive_model} from "../../../kernel/directive/react/v-model";
import {parse_directive_bind} from "../../../kernel/directive/property/v-bind";
import {ContextController} from "../../prototype/ContextController";
import {parse_directive_show} from "../../../kernel/directive/justify/v-show";
import {parse_directive_render} from "../../../kernel/directive/justify/v-render";
import {parse_directive_if} from "../../../kernel/directive/justify/v-if";
import {parse_directive_switch} from "../../../kernel/directive/justify/v-switch";
import {parse_directive_for_of} from "../../../kernel/directive/loop/v-for";
import {parse_directive_salt_extract} from "../../../kernel/directive/salt/v-solt";
import {parse_directive_expression} from "../../../kernel/directive/data/v-el";
import {parse_directive_for_map} from "../../../kernel/directive/loop/v-map";
import {Component} from "../../../index";

/**
 * This function is used to parse_directive those commands which should be executed before mount.
 * @param tagTemplate
 * @param proto
 * @param controller
 */
export function directive_parse_collection_for_before(tagTemplate:Element, proto:Component, controller:ContextController):void
{
    add_label_to_element(tagTemplate.children, proto.getName());
    parse_directive_event(tagTemplate.children, proto.getMethods(),controller.dataForMethod, controller.originalData);
    parse_directive_html(tagTemplate.children, controller.dataForMethod, controller);
    parse_directive_txt(tagTemplate.children, controller.dataForMethod, controller);
    parse_directive_model(tagTemplate.children, controller.dataForMethod);
    parse_directive_bind(tagTemplate.children, controller.dataForMethod);
    parse_directive_salt_extract(tagTemplate.children, controller);
}

/**
 * This function is used to parse_directive those commands which should be executed after mount.
 * @param templateSpace
 * @param controller
 */
export function directive_parse_collection_for_after(templateSpace:ParentNode, controller:ContextController):void{
    parse_directive_show(templateSpace.children,controller.dataForMethod);
    parse_directive_render(templateSpace.children,controller.dataForMethod);
    parse_directive_if(templateSpace.children,controller.dataForMethod);
    parse_directive_switch(templateSpace.children,controller.dataForMethod);
    parse_directive_for_map(templateSpace.children,controller.dataForMethod);
    parse_directive_for_of(templateSpace.children,controller.dataForMethod);
    parse_directive_expression(controller.componentAttachedRootElement,controller.dataForMethod,controller);
}