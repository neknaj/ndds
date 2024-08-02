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
    outputChannel = vscode.window.createOutputChannel("NDDS Preview");
    outputChannel.appendLine('Extension activated');
    let disposable = vscode.commands.registerCommand('extension.showPreview', () => {
        const panel = vscode.window.createWebviewPanel(
            'preview',
            'Preview',
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

module.exports = {
	activate,
}
