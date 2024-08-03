import { elm, textelm } from '../cdom_module.js';

export function doctitle(title) {
    console.log(title)
    document.getElementsByTagName("title")[0].innerHTML = gettext(title[0]);
    return elm("h1",{class:["doctitle"]},title[0]);
}

export function title(title) {
    return elm(`h${Runtime.Indent<6?Runtime.Indent+1:6}`,{},title[0]);
}

export function text(title) {
    return elm("span",{},[textelm(title)]);
}

export function code(code) {
    return elm("code",{},[textelm(gettext(code[0]))]);
}

export function img(_,src) {
    return elm("img",{src},[]);
}

export function note(message,type="") {
    return elm("div",{class:["note",type]},message[0]);
}

export function link(dom,loc) {
    return elm("a",{href:loc},dom[0]);
}

export function abbr(dom) {
    return elm("abbr",{},dom[0]);
}

export function dfn(dom,name) {
    return elm("dfn",{id:`abbr-${name}`},dom[0]);
}

export function defabbr(dom,name) {
    return elm("span",{},[
        abbr(dom),
        textelm(" ("),
        dfn([[textelm(name)]],gettext(dom[0])),
        textelm(")"),
    ]);
}

export function align(dom,prop) {
    return dom.addClass("align-"+prop);
}

export function description(title) {
    return;
}

export function undefinedfunc(name) {
    return elm("div",{class:["note","error","undefinedfunc"]},[textelm("Function "), elm("code",{},[textelm(name)]), textelm(" is undefined")]);
}

function gettext(e) {
    return e.map((x)=>{return x.innerText}).join("")
}