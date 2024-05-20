import vscode, { l10n } from "vscode";
import { code4i } from "../extension";

let lastRun = '';
export async function runIBMiCommand(commandToRun?: string) {
  const command = commandToRun || await vscode.window.showInputBox({ title: l10n.t("Enter an IBM i command"), value: lastRun });
  if (command) {
    lastRun = command;
    const result = await code4i.instance.getConnection().runCommand({ command });
    if (result.code === 0) {
      if (await vscode.window.showInformationMessage(l10n.t("Command successfully executed 🥳"), result.stdout ? l10n.t("Open output") : '')) {
        vscode.workspace.openTextDocument({ content: result.stdout || result.stderr });
      }
    }
    else {
      if (await vscode.window.showErrorMessage(l10n.t("Command failed 🤬"), l10n.t("Open output"))) {
        vscode.workspace.openTextDocument({ content: result.stderr || result.stdout });
      }
    }
  }
}