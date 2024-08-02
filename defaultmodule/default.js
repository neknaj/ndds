import { elm, textelm } from '../cdom_module.js';

export function text(title) {
    return elm("span",{},[textelm(title)]);
}

export function title(title) {
    return elm("h2",{},[title]);
}
export function code(code) {
    return elm("code",{},[textelm(code)]);
}

export function doctitle(title) {
    document.getElementsByTagName("title")[0].innerHTML = title.innerText;
    return elm("h1",{},[title]);
}

export function align(dom,prop) {
    return dom.addClass("align-"+prop);
}