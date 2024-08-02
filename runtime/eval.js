import { elm, textelm } from '../cdom_module.js';
var Module = {};

export function NMLLine(obj,module) {
    Module = module;
    return NML(obj.res);
}

function NML(obj) {
    let p = elm("span",{},[]);
    for (let i of obj) {
        if (i.type=="NMLText") {
            p.Add(NMLText(i));
        }
        if (i.type=="InlineFuncCallSet") {
            p.Add(InlineFuncCallSet(i));
        }
    }
    return p;
}

function NMLText(obj) {
    return Module.default.text(obj.text);
}

function InlineFuncCallSet(obj) {
    let res = null;
    { // func
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        let args = blockargs.concat(obj.func.normalargs);
        res = Module.default[obj.func.name](...args);
    }
    return res;
}

function InlineFuncCall_BlockArgs(obj) {
    let res = [];
    for (let i of obj) {
        if (i.type=="NMLArg") {
            res.push(NML(i.arg));
        }
        if (i.type=="TXTArg") {
            res.push(i.arg);
        }
    }
    return res;
}