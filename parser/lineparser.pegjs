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
    function unescapeString(str) {
        return str.replace(/\\(.)/g, "$1");
    }
    let loc = location;
}

start = &{ skipLines(options.line); skipChars(options.col); return true; } res:target (.*) { return res; }

target = indent:(">>> "/"") res:texttarget linebreak:("$"/"") "\n" { return {indent,res,linebreak:linebreak!="$"}; }

texttarget = ((f:InlineFuncCall c:ChainFuncCall* {return {type:"InlineFuncCallSet",func:f,chain:c}})/nmltext)*

nmltext = chars:(EscapedChar / [^\\\n!\}$])+ { return {type:"NMLText",text:unescapeString(chars.join(""))}; }


InlineFuncCall = "!" name:FuncName
                    normalargs:(("(" arg:NormalArg ")" {return arg})/("" {return []}))
                    blockargs:(
                        ("[" arg:TXTArg "]" {return {type:"TXTArg",arg:arg};})
                        /("{" arg:NMLArg "}" {return {type:"NMLArg",arg:arg};})
                    )*
                    { return {type:"InlineFuncCall",name,blockargs,normalargs} }

ChainFuncCall = "->" name:FuncName normalargs:(("(" arg:NormalArg ")" {return arg})/("" {return []})) { return {type:"ChainFuncCall",name:name,args:normalargs} }

FuncName = a:([a-zA-Z_]) b:([a-zA-Z0-9_])* { return a+b.join(""); }

NormalArg = (a:(InlineFuncCall/textArg/numberArg) b:("|" c:(InlineFuncCall/textArg/numberArg) {return c})* {return [a].concat(b)})/("" {return []})
textArg = "\"" chars:(EscapedChar / [^\\\n\"])* "\"" { return unescapeString(chars.join("")); }
numberArg = chars:([0-9_]/".")+ { return Number(chars.join("")); }
TXTArg = chars:("\\\\" / EscapedChar / [^\n\]])* { return unescapeString(chars.join("")); }
NMLArg = texttarget

EscapedChar = "\\" char:[^\\n] { return "\\"+char; }