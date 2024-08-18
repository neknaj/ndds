// NMLのtitleとdescriptionだけを取得します

const lineparser = require('./lineparser.n.js').parse;

const info = {
    "title": "",
    "description": "",
}


function converter(input) {
    input = input.replaceAll("\r\n","\n");
    info.title = "no title";
    info.description = "";

    input += "\n";
    let inputlines = input.split("\n");
    let lastLn = inputlines.length;
    let nest = 0;
    let nestList = [null];
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
            continue;
        }


        if (line.indent==">>> ") { // インデント追加
            nestList.push(null);
        }
        Indent = nestList.length-1;
        NML(line.res); // NMLを評価する

    }

    return info;
}
function countIndent(ils,ln) {
    let i = 0;
    while (ils[ln-1][i]==" ") {i++;}
    return i/4;
}

function NML(obj) {
    for (let i of obj) {
        if (i.type=="InlineFuncCallSet") {
            let res = InlineFuncCallSet(i);
        }
    }
}

function InlineFuncCallSet(obj) {
    let res = "";
    if (obj.func.name=="doctitle") { // DOC TITLE
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        info.title = blockargs;
    }
    else if (obj.func.name=="description") { // DOC DESCRIPTION
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        info.description = blockargs;
    }
    else if (obj.func.name=="defabbr") { // DOC DESCRIPTION
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        res += blockargs+` ( ${obj.func.normalargs} ) `;
    }
    else {
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        res += blockargs;
    }
    return res;
}
function NMLArg(obj) {
    let res = ""
    for (let i of obj) {
        if (i.type=="NMLText") {
            res += i.text;
        }
        if (i.type=="InlineFuncCallSet") {
            res += InlineFuncCallSet(i);
        }
    }
    return res;
}

function InlineFuncCall_BlockArgs(obj) {
    let res = "";
    for (let i of obj) {
        if (i.type=="NMLArg") {
            res += NMLArg(i.arg);
        }
        if (i.type=="TXTArg") {
            res += i.arg;
        }
    }
    return res;
}

exports.converter = converter;