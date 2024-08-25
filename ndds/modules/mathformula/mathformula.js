import { elm, textelm } from '../../runtime/cdom_module.js';
import katex from 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.mjs';

const Inline = {
    math(code) {
        let tmp = elm("span",{},[]);
        katex.render(gettext(code[0]),tmp,{displayMode: false});
        return tmp.lastChild.addClass("mathinlineformula");
    },
}
const Block = {
    math(code) {
        let tmp = elm("span",{},[]);
        katex.render(code.join("\\\n"),tmp,{displayMode: true});
        return tmp.lastChild.addClass("mathblockformula");
    },
}
const Chain = {
}

function gettext(e) {
    return e.map((x)=>{return x.innerText}).join("")
}

export {Inline,Block,Chain};