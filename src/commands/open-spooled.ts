import vscode, { l10n } from "vscode";
import { code4i } from "../extension";

type SpooledFile = {
  name: string
  number: number
  size: number
  job: string
  userData?: string
};

export async function openSpooledFile() {
  const spooledFiles = (await code4i.instance.getConnection().runSQL(`
    Select * 
    From Table(QSYS2.SPOOLED_FILE_INFO(JOB_NAME => '*ALL', STATUS => '*READY'))
    Order by CREATION_TIMESTAMP;
  `))
    .map(row => ({
      name: String(row.SPOOLED_FILE_NAME),
      number: Number(row.SPOOLED_FILE_NUMBER),
      size: Number(row.SIZE),
      job: String(row.QUALIFIED_JOB_NAME),
      userData: row.USER_DATA ? String(row.USER_DATA) : undefined,
    }) as SpooledFile);
  if (spooledFiles.length) {
    const selected = (await vscode.window.showQuickPick(
      spooledFiles.map(spooledFile => ({ label: `${spooledFile.name} (${spooledFile.number})`, description: spooledFile.userData, detail: `Job: ${spooledFile.job} - Size: ${spooledFile.size}`, spooledFile })),
      { title: l10n.t("Select a spooled file") }
    ))?.spooledFile;

    if (selected) {
      const rows = await code4i.instance.getConnection().runSQL(`
        Select SPOOLED_DATA From Table(SYSTOOLS.SPOOLED_FILE_DATA(JOB_NAME => '${selected.job}', SPOOLED_FILE_NAME =>'${selected.name}', SPOOLED_FILE_NUMBER => ${selected.number}));
      `);
      if (rows) {
        vscode.workspace.openTextDocument({ content: rows.map(row => String(row.SPOOLED_DATA)).join("\n") });
      }
    }
  }
}