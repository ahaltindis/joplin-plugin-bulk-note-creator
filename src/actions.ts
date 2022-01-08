import joplin from "api";
import { Parameter } from "./parameters";
import { BulkNote, BulkProperties } from "./types";

export const createNoteFromBulkNote = async (folderId: string, note: BulkNote): Promise<void> => {
  await joplin.data.post(["notes"], null, {
    parent_id: folderId,
    title: note.title,
    body: note.body,
    is_todo: note.isTodo,
    todo_due: note.todoDue
  });
}

const fillN = (template: string, n: number): string => {
  return template.replace("{n}", (n+1).toString());
}

export const prepareBulkNotes = (rawData: Record<string, string>, parameters: Parameter[]): BulkNote[] => {
  console.info("creating bulk notes with rawData: " + JSON.stringify(rawData));

  let bulkProperties: BulkProperties = {
    titleTemplate: '',
    bodyTemplate: '',
    isTodo: 0,
    total: 0
  };

  parameters.forEach(parameter => bulkProperties = parameter.processInput(bulkProperties, rawData));

  return Array.from(Array(bulkProperties.total)).map((_, n) => {
    return {
      title: fillN(bulkProperties.titleTemplate, n),
      body: fillN(bulkProperties.bodyTemplate, n),
      isTodo: bulkProperties.isTodo || 0
    }
  });
}
