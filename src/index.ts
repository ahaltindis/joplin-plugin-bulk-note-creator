import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { setBulkCreateView } from './views/bulkCreateView';
import { createNoteFromBulkNote, prepareBulkNotes } from './actions'
import { Parameter, StringParameter, NumberParameter, BinaryParameter } from './parameters';

joplin.plugins.register({
	onStart: async function() {
		const dialogViewHandle = await joplin.views.dialogs.create("dialog");

		const createBulkNotes = async () => {
			const currentFolder = await joplin.workspace.selectedFolder();

			const parameters: Parameter[] = [
				new StringParameter("Note Title", "titleTemplate"),
				new StringParameter("Note Body", "bodyTemplate"),
				new BinaryParameter("Is ToDo", "isTodo", "No", "Yes"),
				new NumberParameter("Total", "total"),
			];

			const formName = await setBulkCreateView(dialogViewHandle, currentFolder.title, parameters);
			const result = await joplin.views.dialogs.open(dialogViewHandle);

			if (result.id === "create") {
				console.info('Dialog result: ' + JSON.stringify(result));
				const bulkNotes = prepareBulkNotes(result.formData[formName], parameters);
				console.info('notes will be created: ' + JSON.stringify(bulkNotes));
				bulkNotes.forEach(async bulkNote => await createNoteFromBulkNote(currentFolder.id, bulkNote));
			}
		}

		await joplin.commands.register({
			name: "createBulkNotes",
			label: "Create bulk notes",
			execute: async () => {
				await createBulkNotes();
			}
		});

		await joplin.views.menuItems.create('createBulkNotesMenuItem', 'createBulkNotes', MenuItemLocation.Tools);
	},
});
