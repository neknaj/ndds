// for Client Side ( Web Browser )

import { elm, textelm } from '../cdom_module.js';
var Module = {};

export function NMLLine(obj,module,parent) {
    Module = module;
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
            res = Module.default.undefinedfunc(obj.func.name);
        }
        else {
            res = Module.default[obj.func.name](...args);
        }
    }
    if (!error) { // chain
        for (let i of obj.chain) {
            if (Module.default[i.name]==null) {
                error = true;
                res = Module.default.undefinedfunc(i.name);
                break;
            }
            else {
                res = Module.default[i.name](...[res].concat(i.args));
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