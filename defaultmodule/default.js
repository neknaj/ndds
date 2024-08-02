import { elm, textelm } from '../cdom_module.js';

export function doctitle(title) {
    console.log(title)
    document.getElementsByTagName("title")[0].innerHTML = title.innerText;
    return elm("h1",{},title[0]);
}

export function title(title) {
    return elm("h2",{},title[0]);
}

export function text(title) {
    return elm("span",{},[textelm(title)]);
}

export function code(code) {
    return elm("code",{},[textelm(code[0].map((x)=>{return x.innerText}).join(""))]);
}

export function note(message,type="") {
    return elm("div",{class:["note"]},message[0]);
}

export function align(dom,prop) {
    return dom.addClass("align-"+prop);
}