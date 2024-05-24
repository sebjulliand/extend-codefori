import { CodeForIBMi } from '@halcyontech/vscode-ibmi-types';
import * as vscode from 'vscode';
import { displayFileDescription } from './commands/display-file-description';
import { openSpooledFile } from './commands/open-spooled';
import { runIBMiCommand } from './commands/run-ibmi-command';

export let code4i: CodeForIBMi;

export async function activate(context: vscode.ExtensionContext) {
	const codeForIBMiExtension = vscode.extensions.getExtension<CodeForIBMi>('halcyontechltd.code-for-ibmi');
	if (codeForIBMiExtension) {
		code4i = codeForIBMiExtension.isActive ? codeForIBMiExtension.exports : await codeForIBMiExtension.activate();
	}
	else {
		throw new Error(vscode.l10n.t("This extension requires the 'halcyontechltd.code-for-ibmi' extension to be activated!"));
	}

	context.subscriptions.push(
		vscode.commands.registerCommand('run.ibmi.command', runIBMiCommand),
		vscode.commands.registerCommand('open.spooled.file', openSpooledFile),
		vscode.commands.registerCommand('display.file.description', displayFileDescription)
	);

	console.log("Code for IBM i extension activated");
}

export function deactivate() {
	console.log("Code for IBM i deactivated");
}
