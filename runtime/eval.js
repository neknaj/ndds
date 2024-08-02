import { elm, textelm } from '../cdom_module.js';
var Module = {};

export function NMLLine(obj,module,parent) {
    Module = module;
    return NML(obj.res,parent);
}

function NML(obj,parent) {
    for (let i of obj) {
        if (i.type=="NMLText") {
            parent.Add(NMLText(i));
        }
        if (i.type=="InlineFuncCallSet") {
            parent.Add(InlineFuncCallSet(i));
        }
    }
    return parent;
}

function NMLText(obj) {
    return Module.default.text(obj.text);
}

function InlineFuncCallSet(obj) {
    console.log(obj)
    let res = null;
    { // func
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        let args = blockargs.concat(obj.func.normalargs);
        res = Module.default[obj.func.name](...args);
    }
    for (let i of obj.chain) {
        console.log(i)
        res = Module.default[i.name](...[res].concat(i.args));
    }
    return res;
}

function InlineFuncCall_BlockArgs(obj) {
    let res = [];
    for (let i of obj) {
        if (i.type=="NMLArg") {
            res.push(NML(i.arg,elm("span",{},[])));
        }
        if (i.type=="TXTArg") {
            res.push(i.arg);
        }
    }
    return res;
}