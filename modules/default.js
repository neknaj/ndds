import { elm, textelm } from '../runtime/cdom_module.js';
import { Converter } from '../runtime/eval.js';


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
        return elm("code",{class:["inline"]},[textelm(gettext(code[0]))]);
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
    },
    card(dom,loc) {
        let card = elm("a",{href:loc},[textelm(loc)]);
        fetch(loc+"?info").then(res=>res.text().then(text=>{
            const info = JSON.parse(text);
            console.log(info)
            card.innerHTML = info.title;
            card.alt = info.description;
        }))
        return card;
    },
}
const Block = {
    code(arg,type) {
        return elm("div",{class:["codeblock"]},[
            elm("code",{class:["block"]},[textelm(arg.join("\n"))]),
        ]);
    },
    tableFromJSON(arg,type) {
        let data = JSON.parse(arg.join("\n"))
        console.log(data)
        return elm("table",{},[
            elm("thead",{},data.label.map(x=>elm("th",{},[textelm(x)]))),
            ...data.data.map(col=>
                elm("tr",{},
                    col.map(x=>elm("td",{},[textelm(x)])),
                )
            ),
        ]);
    },
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