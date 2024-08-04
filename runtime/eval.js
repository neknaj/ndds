// for Client Side ( Web Browser )

import { elm, textelm } from '../cdom_module.js';
import {peg$parse as lineparser} from '../parser/lineparser.js';

var Module = {};
let Indent = 0;

Array.prototype.last = function(n=1) {
    return this[this.length-n];
};


export function Converter(input,parent,module) {
    input += "\n";
    Module = module;
    let inputlines = input.split("\n");
    let lastLn = inputlines.length;
    let nestList = [parent];
    for (let ln=1;ln<lastLn;ln++) {
        // line.indentがある場合、nestListにdiv要素を追加する (">>>" )
        {
            let newindent = countIndent(inputlines,ln);
            while (newindent<nestList.length-1) {
                nestList.pop();
            }
        }
        let line = lineparser(input,{line:ln,col:(nestList.length-1)*4});
        if (line.indent==">>> ") { // インデント追加
            let newelm = elm("div",{class:["nest"]},[]);
            nestList.last().Add(newelm);
            nestList.push(newelm);
        }
        Indent = nestList.length-1;
        NML_Runtime.NMLLine(line,nestList.last());
        if ((line.linebreak&&line.res.length!=0)||(!line.linebreak&&line.res.length==0)) {
            nestList.last().Add(elm("br",{},[]));
        }
    }
}
function countIndent(ils,ln) {
    let i = 0;
    while (ils[ln-1][i]==" ") {i++;}
    return i/4;
}

export function NMLLine(obj,parent) {
    let res = NML(obj.res,[]);
    for (let i of res) {
        parent.Add(i);
    }
}

function NML(obj,parent) {
    for (let i of obj) {
        if (i.type=="NMLText") {
            parent.push(NMLText(i));
        }
        if (i.type=="InlineFuncCallSet") {
            let res = InlineFuncCallSet(i);
            if (res instanceof HTMLElement) {
                parent.push(res);
            }
        }
    }
    return parent;
}

function NMLText(obj) {
    return Module.default.text(obj.text);
}

function InlineFuncCallSet(obj) {
    let res = null;
    let error = false;
    { // func
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        let args = [blockargs].concat(obj.func.normalargs);
        if (Module.default[obj.func.name]==null) {
            error = true;
            res = Module.default.undefinedfunc.bind({Indent})(obj.func.name);
        }
        else {
            res = Module.default[obj.func.name].bind({Indent})(...args);
        }
    }
    if (!error) { // chain
        for (let i of obj.chain) {
            if (Module.default[i.name]==null) {
                error = true;
                res = Module.default.undefinedfunc.bind({Indent})(i.name);
                break;
            }
            else {
                res = Module.default[i.name].bind({Indent})(...[res].concat(i.args));
            }
        }
    }
    return res;
}

function InlineFuncCall_BlockArgs(obj) {
    let res = [];
    for (let i of obj) {
        if (i.type=="NMLArg") {
            res.push(NML(i.arg,[]));
        }
        if (i.type=="TXTArg") {
            res.push([elm("span",{},[textelm(i.arg)])]);
        }
    }
    return res;
}