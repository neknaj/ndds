// for Client Side ( Web Browser )

import { elm, textelm } from './cdom_module.js';
import {peg$parse as lineparser} from './lineparser.js';

var Module = {};
let Indent = 0;

Array.prototype.last = function(n=1) {
    return this[this.length-n];
};

export function setModule(module) {
    Module = module;
}

export function Converter(input,parent) {
    input += "\n";
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

        if (line.indent==">>$ ") { // ブロック呼び出し
            ln++;
            const baseindent = nestList.length;
            line.func.blockargs = [];
            // console.log("基準インデント",nestList.length)
            // console.log("ブロック呼び出し")
            // console.log(line)
            while (ln<lastLn) { // ブロック呼び出しの引数
                let newindent = countIndent(inputlines,ln);
                if (newindent!=baseindent) {
                    ln--; break;
                }
                if (inputlines[ln-1].startsWith("<<= ",baseindent*4) | inputlines[ln-1].startsWith("<<< ",baseindent*4)) { // ブロック文字列引数
                    const argtype = inputlines[ln-1].startsWith("<<< ",baseindent*4)?"BlockNMLArg":"BlockTXTArg";
                    let TXTarg = [];
                    TXTarg.push(inputlines[ln-1].substring((baseindent+1)*4))
                    while (ln<lastLn) {
                        ln++;
                        let newindent = countIndent(inputlines,ln);
                        if (newindent<baseindent+1) {ln--;break;}
                        TXTarg.push(inputlines[ln-1].substring((baseindent+1)*4))
                    }
                    line.func.blockargs.push({type:argtype,arg:TXTarg.join("\n")});
                }
                else {
                    ln--; break;
                }
                ln++;
            }
            NMLBlockCall(line,nestList.last())
            continue;
        }

        // ブロック呼び出しでない普通の行

        if (line.indent==">>> ") { // インデント追加
            let newelm = elm("div",{class:["nest"]},[]);
            nestList.last().Add(newelm);
            nestList.push(newelm);
        }
        Indent = nestList.length-1;
        NMLLine(line,nestList.last()); // NMLを評価する
        if ((line.linebreak&&line.res.length!=0)||(!line.linebreak&&line.res.length==0)) { // 改行の処理
            nestList.last().Add(elm("br",{},[]));
        }

    }
}
function countIndent(ils,ln) {
    let i = 0;
    while (ils[ln-1][i]==" ") {i++;}
    return i/4;
}



//
//  普通の行の評価をする
//

function NMLLine(obj,parent) {
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
    return Module.Inline.text(obj.text);
}

function InlineFuncCallSet(obj) {
    let res = null;
    let error = false;
    { // func
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        let args = [blockargs].concat(obj.func.normalargs);
        if (Module.Inline[obj.func.name]==null) {
            error = true;
            res = Module.Inline.undefinedfunc.bind({Indent})(obj.func.name);
        }
        else {
            res = Module.Inline[obj.func.name].bind({Indent})(...args);
        }
    }
    if (!error) { // chain
        for (let i of obj.chain) {
            if (Module.Chain[i.name]==null) {
                error = true;
                res = Module.Chain.undefinedfunc.bind({Indent})(i.name);
                break;
            }
            else {
                res = Module.Chain[i.name].bind({Indent})(...[res].concat(i.args));
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



//
//  ブロック呼び出しの評価をする
//

function NMLBlockCall(obj,parent) {
    parent.Add(BlockFuncCallSet(obj));
}

function BlockFuncCallSet(obj) {
    let res = null;
    let error = false;
    { // func
        let [blockargs,argstype] = BlockFuncCall_BlockArgs(obj.func.blockargs);
        console.log(blockargs,argstype)
        let args = [blockargs,argstype].concat(obj.func.normalargs);
        if (Module.Block[obj.func.name]==null) {
            error = true;
            res = Module.Block.undefinedfunc.bind({Indent,Converter})(obj.func.name);
        }
        else {
            res = Module.Block[obj.func.name].bind({Indent,Converter})(...args);
        }
    }
    if (!error) { // chain
        for (let i of obj.chain) {
            if (Module.Chain[i.name]==null) {
                error = true;
                res = Module.Chain.undefinedfunc.bind({Indent})(i.name);
                break;
            }
            else {
                res = Module.Chain[i.name].bind({Indent})(...[res].concat(i.args));
            }
        }
    }
    return res;
}

function BlockFuncCall_BlockArgs(obj) {
    let res = [];
    let type = [];
    for (let i of obj) {
        res.push(i.arg);
        type.push(i.type);
    }
    return [res,type];
}