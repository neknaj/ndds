/*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */

"use strict";

function peg$subclass(child, parent) {
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message  = message;
  this.expected = expected;
  this.found    = found;
  this.location = location;
  this.name     = "SyntaxError";

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return "\"" + literalEscape(expectation.text) + "\"";
        },

        "class": function(expectation) {
          var escapedParts = "",
              i;

          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array
              ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
              : classEscape(expectation.parts[i]);
          }

          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },

        any: function(expectation) {
          return "any character";
        },

        end: function(expectation) {
          return "end of input";
        },

        other: function(expectation) {
          return expectation.description;
        }
      };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g,  '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/\]/g, '\\]')
      .replace(/\^/g, '\\^')
      .replace(/-/g,  '\\-')
      .replace(/\0/g, '\\0')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = new Array(expected.length),
        i, j;

    for (i = 0; i < expected.length; i++) {
      descriptions[i] = describeExpectation(expected[i]);
    }

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== void 0 ? options : {};

  var peg$FAILED = {},

      peg$startRuleFunctions = { start: peg$parsestart },
      peg$startRuleFunction  = peg$parsestart,

      peg$c0 = function() { skipLines(options.line); skipChars(options.col); return true; },
      peg$c1 = peg$anyExpectation(),
      peg$c2 = function(res) { return res; },
      peg$c3 = ">>> ",
      peg$c4 = peg$literalExpectation(">>> ", false),
      peg$c5 = "",
      peg$c6 = "$",
      peg$c7 = peg$literalExpectation("$", false),
      peg$c8 = "\n",
      peg$c9 = peg$literalExpectation("\n", false),
      peg$c10 = function(indent, res, linebreak) { return {indent,res,linebreak:linebreak!="$"}; },
      peg$c11 = function(f, c) {return {type:"InlineFuncCallSet",func:f,chain:c}},
      peg$c12 = /^[^\\\n!}$]/,
      peg$c13 = peg$classExpectation(["\\", "\n", "!", "}", "$"], true, false),
      peg$c14 = function(chars) { return {type:"NMLText",text:chars.join("")}; },
      peg$c15 = "!",
      peg$c16 = peg$literalExpectation("!", false),
      peg$c17 = "(",
      peg$c18 = peg$literalExpectation("(", false),
      peg$c19 = ")",
      peg$c20 = peg$literalExpectation(")", false),
      peg$c21 = function(name, arg) {return arg},
      peg$c22 = function(name) {return []},
      peg$c23 = "[",
      peg$c24 = peg$literalExpectation("[", false),
      peg$c25 = "]",
      peg$c26 = peg$literalExpectation("]", false),
      peg$c27 = function(name, normalargs, arg) {return {type:"TXTArg",arg:arg};},
      peg$c28 = "{",
      peg$c29 = peg$literalExpectation("{", false),
      peg$c30 = "}",
      peg$c31 = peg$literalExpectation("}", false),
      peg$c32 = function(name, normalargs, arg) {return {type:"NMLArg",arg:arg};},
      peg$c33 = function(name, normalargs, blockargs) { return {type:"InlineFuncCall",name,blockargs,normalargs} },
      peg$c34 = "->",
      peg$c35 = peg$literalExpectation("->", false),
      peg$c36 = function(name, normalargs) { return {type:"ChainFuncCall",name:name,args:normalargs} },
      peg$c37 = /^[a-zA-Z_]/,
      peg$c38 = peg$classExpectation([["a", "z"], ["A", "Z"], "_"], false, false),
      peg$c39 = /^[a-zA-Z0-9_]/,
      peg$c40 = peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_"], false, false),
      peg$c41 = function(a, b) { return a+b.join(""); },
      peg$c42 = "|",
      peg$c43 = peg$literalExpectation("|", false),
      peg$c44 = function(a, c) {return c},
      peg$c45 = function(a, b) {return [a].concat(b)},
      peg$c46 = function() {return []},
      peg$c47 = "\"",
      peg$c48 = peg$literalExpectation("\"", false),
      peg$c49 = /^[^\\\n"]/,
      peg$c50 = peg$classExpectation(["\\", "\n", "\""], true, false),
      peg$c51 = function(chars) { return chars.join(""); },
      peg$c52 = /^[0-9_]/,
      peg$c53 = peg$classExpectation([["0", "9"], "_"], false, false),
      peg$c54 = ".",
      peg$c55 = peg$literalExpectation(".", false),
      peg$c56 = function(chars) { return Number(chars.join("")); },
      peg$c57 = /^[^\n\]]/,
      peg$c58 = peg$classExpectation(["\n", "]"], true, false),
      peg$c59 = "\\",
      peg$c60 = peg$literalExpectation("\\", false),
      peg$c61 = function(char) { return char; },

      peg$currPos          = 0,
      peg$savedPos         = 0,
      peg$posDetailsCache  = [{ line: 1, column: 1 }],
      peg$maxFailPos       = 0,
      peg$maxFailExpected  = [],
      peg$silentFails      = 0,

      peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos], p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line:   details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos),
        endPosDetails   = peg$computePosDetails(endPos);

    return {
      start: {
        offset: startPos,
        line:   startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line:   endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsestart() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    peg$savedPos = peg$currPos;
    s1 = peg$c0();
    if (s1) {
      s1 = void 0;
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsetarget();
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (input.length > peg$currPos) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c1); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c1); }
          }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsetarget() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c3) {
      s1 = peg$c3;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c4); }
    }
    if (s1 === peg$FAILED) {
      s1 = peg$c5;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsetexttarget();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 36) {
          s3 = peg$c6;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c7); }
        }
        if (s3 === peg$FAILED) {
          s3 = peg$c5;
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s4 = peg$c8;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c9); }
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c10(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsetexttarget() {
    var s0, s1, s2, s3, s4;

    s0 = [];
    s1 = peg$currPos;
    s2 = peg$parseInlineFuncCall();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseChainFuncCall();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseChainFuncCall();
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s1;
        s2 = peg$c11(s2, s3);
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 === peg$FAILED) {
      s1 = peg$parsenmltext();
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$currPos;
      s2 = peg$parseInlineFuncCall();
      if (s2 !== peg$FAILED) {
        s3 = [];
        s4 = peg$parseChainFuncCall();
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseChainFuncCall();
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s1;
          s2 = peg$c11(s2, s3);
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$parsenmltext();
      }
    }

    return s0;
  }

  function peg$parsenmltext() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseEscapedChar();
    if (s2 === peg$FAILED) {
      if (peg$c12.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseEscapedChar();
        if (s2 === peg$FAILED) {
          if (peg$c12.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c13); }
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c14(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseInlineFuncCall() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 33) {
      s1 = peg$c15;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c16); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFuncName();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s4 = peg$c17;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseNormalArg();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s6 = peg$c19;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c20); }
            }
            if (s6 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c21(s2, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$c5;
          if (s4 !== peg$FAILED) {
            peg$savedPos = s3;
            s4 = peg$c22(s2);
          }
          s3 = s4;
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s6 = peg$c23;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parseTXTArg();
            if (s7 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s8 = peg$c25;
                peg$currPos++;
              } else {
                s8 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c26); }
              }
              if (s8 !== peg$FAILED) {
                peg$savedPos = s5;
                s6 = peg$c27(s2, s3, s7);
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          if (s5 === peg$FAILED) {
            s5 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 123) {
              s6 = peg$c28;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parsetexttarget();
              if (s7 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 125) {
                  s8 = peg$c30;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c31); }
                }
                if (s8 !== peg$FAILED) {
                  peg$savedPos = s5;
                  s6 = peg$c32(s2, s3, s7);
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
              s6 = peg$c23;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c24); }
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$parseTXTArg();
              if (s7 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s8 = peg$c25;
                  peg$currPos++;
                } else {
                  s8 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c26); }
                }
                if (s8 !== peg$FAILED) {
                  peg$savedPos = s5;
                  s6 = peg$c27(s2, s3, s7);
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 123) {
                s6 = peg$c28;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c29); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parsetexttarget();
                if (s7 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s8 = peg$c30;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c31); }
                  }
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s5;
                    s6 = peg$c32(s2, s3, s7);
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s2, s3, s4);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseChainFuncCall() {
    var s0, s1, s2, s3, s4, s5, s6;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c34) {
      s1 = peg$c34;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c35); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parseFuncName();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s4 = peg$c17;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c18); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseNormalArg();
          if (s5 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s6 = peg$c19;
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c20); }
            }
            if (s6 !== peg$FAILED) {
              peg$savedPos = s3;
              s4 = peg$c21(s2, s5);
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = peg$currPos;
          s4 = peg$c5;
          if (s4 !== peg$FAILED) {
            peg$savedPos = s3;
            s4 = peg$c22(s2);
          }
          s3 = s4;
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s2, s3);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseFuncName() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (peg$c37.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c38); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$c39.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        if (peg$c39.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c40); }
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c41(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNormalArg() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseInlineFuncCall();
    if (s1 === peg$FAILED) {
      s1 = peg$parsetextArg();
      if (s1 === peg$FAILED) {
        s1 = peg$parsenumberArg();
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s4 = peg$c42;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parseInlineFuncCall();
        if (s5 === peg$FAILED) {
          s5 = peg$parsetextArg();
          if (s5 === peg$FAILED) {
            s5 = peg$parsenumberArg();
          }
        }
        if (s5 !== peg$FAILED) {
          peg$savedPos = s3;
          s4 = peg$c44(s1, s5);
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 124) {
          s4 = peg$c42;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c43); }
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseInlineFuncCall();
          if (s5 === peg$FAILED) {
            s5 = peg$parsetextArg();
            if (s5 === peg$FAILED) {
              s5 = peg$parsenumberArg();
            }
          }
          if (s5 !== peg$FAILED) {
            peg$savedPos = s3;
            s4 = peg$c44(s1, s5);
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c45(s1, s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$c5;
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c46();
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parsetextArg() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c47;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c48); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseEscapedChar();
      if (s3 === peg$FAILED) {
        if (peg$c49.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c50); }
        }
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseEscapedChar();
        if (s3 === peg$FAILED) {
          if (peg$c49.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c50); }
          }
        }
      }
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s3 = peg$c47;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c51(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberArg() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$c52.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c53); }
    }
    if (s2 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 46) {
        s2 = peg$c54;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c55); }
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$c52.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c54;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c55); }
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c56(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseTXTArg() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseEscapedChar();
    if (s2 === peg$FAILED) {
      if (peg$c57.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c58); }
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseEscapedChar();
      if (s2 === peg$FAILED) {
        if (peg$c57.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$c51(s1);
    }
    s0 = s1;

    return s0;
  }

  function peg$parseEscapedChar() {
    var s0, s1, s2;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 92) {
      s1 = peg$c59;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$c60); }
    }
    if (s1 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c1); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c61(s2);
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }


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


  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse:       peg$parse
};