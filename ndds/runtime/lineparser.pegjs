{
    function skipLines(n) {
        let count = 0;
        while (count < n - 1 && peg$currPos < input.length) {
            if (input[peg$currPos] === "\n") count++;
            peg$currPos++;
        }
    }
    function skipChars(m) {
        peg$currPos = Math.min(peg$currPos + m, input.length);
    }
    let loc = location;
}

start = &{ skipLines(options.line); skipChars(options.col); return true; } res:(nmlblockcall/nmlline) (.*) { return res; }

nmlline = indent:(">>> "/"") res:texttarget linebreak:("$"/"") "\n" { return {indent,res,linebreak:linebreak!="$"}; }
nmlblockcall = indent:(">>$ ") func:BlockFuncCall chain:ChainFuncCall* "\n" { return {indent,func,chain}; }

texttarget = ((f:InlineFuncCall c:ChainFuncCall* {return {type:"InlineFuncCallSet",func:f,chain:c}})/nmltext)*

nmltext = chars:(EscapedChar / [^\\\n!\}\$])+ { return {type:"NMLText",text:chars.join("")}; }


InlineFuncCall = "!" name:FuncName
                    normalargs:(("(" arg:NormalArg ")" {return arg})/("" {return []}))
                    blockargs:(
                        ("[" arg:TXTArg "]" {return {type:"TXTArg",arg:arg};})
                        /("{" arg:NMLArg "}" {return {type:"NMLArg",arg:arg};})
                    )*
                    { return {type:"InlineFuncCall",name,blockargs,normalargs} }
BlockFuncCall = name:FuncName normalargs:(("(" arg:NormalArg ")" {return arg})/("" {return []})) { return {type:"BlockFuncCall",name,normalargs} }

ChainFuncCall = "->" name:FuncName normalargs:(("(" arg:NormalArg ")" {return arg})/("" {return []})) { return {type:"ChainFuncCall",name:name,args:normalargs} }

FuncName = a:([a-zA-Z_]) b:([a-zA-Z0-9_])* { return a+b.join(""); }

NormalArg = (a:(InlineFuncCall/textArg/numberArg/nullArg) b:("," c:(InlineFuncCall/textArg/numberArg/nullArg) {return c})* {return [a].concat(b)})/("" {return []})
textArg = "\"" chars:(EscapedChar / [^\\\n\"])* "\"" { return chars.join(""); }
numberArg = chars:([0-9_]/".")+ { return Number(chars.join("")); }
nullArg = "null" { return null; }
TXTArg = chars:(EscapedChar / [^\n\]])* { return chars.join(""); }
NMLArg = texttarget

EscapedChar = "\\" char:(.) { return char; }