import joplin from "api";
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

export const prepareBulkNotes = (properties: BulkProperties): BulkNote[] => {
  console.info("creating bulk notes with properties: " + JSON.stringify(properties));

  return Array.from(Array(Number.parseFloat(properties.total))).map((_, n) => {
    return {
      title: properties.titleTemplate,
      body: properties.bodyTemplate,
      isTodo: properties.isTodo || 0
    }
  });
}
