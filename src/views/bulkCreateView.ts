import joplin from "api";
import { Parameter } from "src/parameters/base";

export const setBulkCreateView = async (viewHandle: string, currentFolderName: string, parameters: Parameter[]): Promise<string> => {
  await joplin.views.dialogs.addScript(viewHandle, './views/dialog.css');

  const formName = 'bulkProperties';
  const parametersHTML = parameters.map(parameter => parameter.toHTML()).join(" ");

  await joplin.views.dialogs.setHtml(viewHandle, `
    <h3>Bulk Create Notes</h3>
    <p>Will create in <i>${currentFolderName}</i></p>
    <form name="${formName}">
      ${parametersHTML}
    </form>
  `);

  await joplin.views.dialogs.setButtons(viewHandle, [{ id: "create", title: "Create" }, { id: "cancel" }]);

  return formName;
}