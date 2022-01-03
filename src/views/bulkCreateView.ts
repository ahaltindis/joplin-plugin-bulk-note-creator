import joplin from "api";
import { encode } from "html-entities";

const createInput = (title: string, name: string, type: string) => {
  return `
    <div class="inputContainer">
        <div class="inputTitle">
            ${encode(title)}
        </div>
        <div>
          <input name="${encode(name)}" type="${type}"></input>
        </div>
    </div>
  `;
}

export const setBulkCreateView = async (viewHandle: string, currentFolderName: string): Promise<void> => {
  await joplin.views.dialogs.addScript(viewHandle, './views/dialog.css');

  await joplin.views.dialogs.setHtml(viewHandle, `
    <h3>Bulk Create Notes</h3>
    <p>Notes will be created in <i>${currentFolderName}</i></p>
    <form name="bulkProperties">
      ${createInput("Note Title", "titleTemplate", "text")}
      ${createInput("Note Body", "bodyTemplate", "text")}
      ${createInput("Total", "total", "number")}
    </form>
  `);

  await joplin.views.dialogs.setButtons(viewHandle, [{ id: "create", title: "Create" }, { id: "cancel" }])
}