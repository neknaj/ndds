// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    outputChannel = vscode.window.createOutputChannel("NDDS Supports");
    outputChannel.appendLine('NDDS Extension activated');
    { // プレビューウインドウを開くボタン
        let PreviewBtn = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
        PreviewBtn.text = "NDDS Preview";
        PreviewBtn.tooltip = "Open NDDS Preview";
        PreviewBtn.command = "nddssupports.showPreview";
        context.subscriptions.push(PreviewBtn);
        function updateButtonVisibility() {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'nml') {
                PreviewBtn.show();
            } else {
                PreviewBtn.hide();
            }
        }
        updateButtonVisibility();
        context.subscriptions.push(
            vscode.window.onDidChangeActiveTextEditor(updateButtonVisibility)
        );
    }
    { // プレビューウインドウ
        const disposable = vscode.commands.registerCommand('nddssupports.showPreview', () => {
            const panel = vscode.window.createWebviewPanel(
                'preview-'+vscode.window.activeTextEditor.document.uri.fsPath,
                'Preview '+path.basename(vscode.window.activeTextEditor.document.uri.fsPath),
                vscode.ViewColumn.Beside,
                {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media')),vscode.workspace.workspaceFolders[0].uri]
                }
            );

            updateContent(panel, context);

            vscode.workspace.onDidChangeTextDocument(event => {
                if (event.document === vscode.window.activeTextEditor?.document) {
                    updateContent(panel, context);
                }
            });
        });
        context.subscriptions.push(disposable);
    }
    { // 補完機能
        const defFuncProvider = vscode.languages.registerCompletionItemProvider('nml', new DefFuncCompletions(),"!"); // 関数補完
        const IndentProvider = vscode.languages.registerCompletionItemProvider('nml', new IndentCompletions()); // インデントマーカー補完

        context.subscriptions.push(defFuncProvider);
        context.subscriptions.push(IndentProvider);
    }
}

function updateContent(panel, context) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const text = editor.document.getText();
        panel.webview.html = getWebviewContent(text, panel.webview, context);
    }
}

function getWebviewContent(content, webview, context) {
    const editor = vscode.window.activeTextEditor;
    const htmlPath = path.join(context.extensionPath, "./preview.html");
    try {
        let html = fs.readFileSync(htmlPath, 'utf-8');
        html = html.replace('${content}', content);
        return html;
    } catch (error) {
        console.error(`Failed to read HTML template: ${error}`);
        return `<html><body><p>Error: Could not load preview.</p></body></html>`;
    }
}


class DefFuncCompletions
{
    provideCompletionItems()
    {
        const comp = [];
        {
            const sni = new vscode.CompletionItem("doctitle");
            sni.insertText = new vscode.SnippetString("doctitle{${1}}$");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        {
            const sni = new vscode.CompletionItem("title - document");
            sni.insertText = new vscode.SnippetString("doctitle{${1}}$");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        {
            const sni = new vscode.CompletionItem("title");
            sni.insertText = new vscode.SnippetString("title{${1}}$");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        {
            const sni = new vscode.CompletionItem("code");
            sni.insertText = new vscode.SnippetString("code[${1}]");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        {
            const sni = new vscode.CompletionItem("note");
            sni.insertText = new vscode.SnippetString("note{${1}}");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        {
            const sni = new vscode.CompletionItem("align");
            sni.insertText = new vscode.SnippetString("align(\"${1|center,right,left,justify|}\")");
            sni.kind = vscode.CompletionItemKind.Function;
            comp.push(sni);
        }
        return comp;
    }
}
class IndentCompletions
{
    provideCompletionItems()
    {
        const comp = [];
        {
            const sni = new vscode.CompletionItem("indent");
            sni.insertText = ">>> ";
            comp.push(sni);
        }
        return comp;
    }
}

module.exports = {
	activate,
}
