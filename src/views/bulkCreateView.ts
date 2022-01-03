import joplin from "api";

export const setBulkCreateView = async (viewHandle: string, currentFolderName: string): Promise<void> => {
  await joplin.views.dialogs.addScript(viewHandle, './views/dialog.css');

  await joplin.views.dialogs.setHtml(viewHandle, `
    <h3>Bulk Create Notes</h3>
    <p>Notes will be created in <i>${currentFolderName}</i></p>
    <form name="bulkProperties">
    </form>
  `);

  await joplin.views.dialogs.setButtons(viewHandle, [{ id: "create", title: "Create" }, { id: "cancel" }])
}