import { elm, textelm } from '../runtime/cdom_module.js';


const Inline = {
    undefinedfunc(name) {
        return elm("div",{class:["note","error","undefinedfunc"]},[textelm("Function "), elm("code",{},[textelm(name)]), textelm(" is undefined")]);
    },
    doctitle(title) {
        document.getElementsByTagName("title")[0].innerHTML = gettext(title[0]);
        return elm("h1",{class:["doctitle"]},title[0]);
    },
    description(title) {
        return;
    },
    title(title) {
        return elm(`h${this.Indent<6?this.Indent+1:6}`,{},title[0]);
    },
    text(title) {
        return elm("span",{},[textelm(title)]);
    },
    code(code) {
        return elm("code",{},[textelm(gettext(code[0]))]);
    },
    img(_,src) {
        return elm("img",{src},[]);
    },
    note(message,type="") {
        return elm("div",{class:["note",type]},message[0]);
    },
    link(dom,loc) {
        return elm("a",{href:loc},dom[0]!=null?dom[0]:[textelm(loc)]);
    },
    abbr(dom) {
        return elm("abbr",{},dom[0]);
    },
    dfn(dom,name) {
        return elm("dfn",{id:`abbr-${name}`},dom[0]);
    },
    defabbr(dom,name) {
        return elm("span",{},[
            Inline.abbr(dom),
            textelm(" ("),
            Inline.dfn([[textelm(name)]],gettext(dom[0])),
            textelm(")"),
        ]);
    }
}
const Block = {
    undefinedfunc(name) {
        return elm("div",{class:["note","error","undefinedfunc"]},[textelm("Function "), elm("code",{},[textelm(name)]), textelm(" is undefined")]);
    }
}
const Chain = {
    undefinedfunc(name) {
        return elm("div",{class:["note","error","undefinedfunc"]},[textelm("Function "), elm("code",{},[textelm(name)]), textelm(" is undefined")]);
    },
    align(dom,prop) {
        return dom.addClass("align-"+prop);
    }
}

function gettext(e) {
    return e.map((x)=>{return x.innerText}).join("")
}

export {Inline,Block,Chain};