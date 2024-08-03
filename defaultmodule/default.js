import { elm, textelm } from '../cdom_module.js';

export function doctitle(title) {
    console.log(title)
    document.getElementsByTagName("title")[0].innerHTML = gettext(title);
    return elm("h1",{},title[0]);
}

export function title(title) {
    return elm("h2",{},title[0]);
}

export function text(title) {
    return elm("span",{},[textelm(title)]);
}

export function code(code) {
    return elm("code",{},[textelm(gettext(code))]);
}

export function note(message,type="") {
    return elm("div",{class:["note",type]},message[0]);
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
    return e[0].map((x)=>{return x.innerText}).join("")
}