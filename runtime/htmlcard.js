// for Server Side ( Provide information such as meta tags )

const lineparser = require('../parser/lineparser.js').parse;
const fs = require('fs');

console.log(process.argv[2]);
let data = fs.readFileSync(process.argv[2],"utf-8").replaceAll("\r\n","\n")+"\n";
console.log(data);

const info = {
    "title": "no title",
    "desciption": "",
}

converter(data);


function converter(input) {
    let inputlines = input.split("\n");
    let lastLn = inputlines.length;
    let nest = 0;
    for (let ln=1;ln<lastLn;ln++) {
        {
            let newindent = countIndent(inputlines,ln);
            while (newindent<nest) {
                nest--;
            }
        }
        let line = lineparser(input,{line:ln,col:nest*4});
        //console.log(line)
        if (line.indent==">>> ") { // インデント追加
            nest++;
        }
        NML(line.res)
    }
}
function countIndent(ils,ln) {
    let i = 0;
    while (ils[ln-1][i]==" ") {i++;}
    return i/4;
}


function InlineFuncCallSet(obj) {
    let res = "";
    if (obj.func.name=="doctitle") { // DOC TITLE
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        console.log("title      :",blockargs)
        info.title = blockargs;
    }
    if (obj.func.name=="description") { // DOC DESCRIPTION
        let blockargs = InlineFuncCall_BlockArgs(obj.func.blockargs);
        console.log("description:",blockargs)
        info.desciption = blockargs;
    }
    return res;
}

function NML(obj) {
    for (let i of obj) {
        if (i.type=="InlineFuncCallSet") {
            let res = InlineFuncCallSet(i);
        }
    }
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