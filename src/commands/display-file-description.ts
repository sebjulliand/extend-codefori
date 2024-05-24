import { ObjectItem } from "@halcyontech/vscode-ibmi-types";
import { runIBMiCommand } from "./run-ibmi-command";

export async function displayFileDescription(objectItem: ObjectItem) {
  const object = objectItem.object;
  runIBMiCommand(`DSPFD FILE(${object.library}/${object.name})`);
}