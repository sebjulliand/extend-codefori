import { MemberItem } from "@halcyontech/vscode-ibmi-types";
import { code4i } from "../extension";

export async function displayMemberDescription(objectItem: MemberItem) {
  const member = objectItem.member;
  const [result] = await code4i.instance.getConnection().runSQL(`
    select * from qsys2.syspartitionstat
    where system_table_schema = '${member.library}' and
      system_table_name = '${member.file}' and
      system_table_member = '${member.name}';
    `);

  if (result) {
    code4i.customUI()
      .addParagraph(`
        <ul>
        ${Object.entries(result)
          .sort(([column1], [column2]) => column1.localeCompare(column2))
          .filter(([column, value]) => value !== null)
          .map(([column, value]) => `<li><b>${column}</b>: ${value}</li>`)
          .join("\n")
        }
        </ul>
      `)
      .loadPage(`${member.library}/${member.file},${member.name}.${member.extension}`);
  }
}