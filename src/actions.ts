import joplin from "api";

export const createNote = async (folderId: string, title: string, body: string, isTodo: 0 | 1, todoDue?: number): Promise<void> => {
  await joplin.data.post(["notes"], null, { body, parent_id: folderId, title, is_todo: isTodo, todo_due: todoDue });
}