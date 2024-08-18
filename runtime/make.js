// pegjsの出力したパーサーのモジュールの形式を無理やり置き換えます
//
// $ npx pegjs parser/lineparser.pegjs
// $ node parser/make.js
//
// pegjsが無い場合は
// $ npm install pegjs (-g)
//
// このツールはpegjsの出力であるlineparser.jsを直接置き換えるため、複数回実行すると正常に動きません
// pegjsのコンパイルとセットで実行してください

const fs = require('fs');

let parser = fs.readFileSync(__dirname+'/lineparser.js', 'utf8');

let replaced = parser
                .replace("function peg$SyntaxError","export function peg$SyntaxError")
                .replace("function peg$parse","export function peg$parse")

                .replace("module.exports = {","// module.exports = {")
                .replace("  SyntaxError: peg$SyntaxError,","//   SyntaxError: peg$SyntaxError,")
                .replace("  parse:       peg$parse\n};","//   parse:       peg$parse\n// };")

fs.writeFileSync(__dirname+'/lineparser.n.js', parser);
fs.writeFileSync(__dirname+'/lineparser.js', replaced);