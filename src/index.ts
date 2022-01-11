import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { setBulkCreateView } from './views/bulkCreateView';
import { createNoteFromBulkNote, prepareBulkNotes } from './actions';
import {
	Parameter,
	StringParameter,
	NumberParameter,
	BinaryParameter,
	RecurrenceParameter,
	BigStringParameter
} from './parameters';

joplin.plugins.register({
	onStart: async function() {
		const dialogViewHandle = await joplin.views.dialogs.create("dialog");

		const createBulkNotes = async () => {
			const currentFolder = await joplin.workspace.selectedFolder();

			const parameters: Parameter[] = [
				new StringParameter("Note Title", "titleTemplate"),
				new BigStringParameter("Note Body", "bodyTemplate"),
				new BinaryParameter("Is ToDo", "isTodo", "No", "Yes"),
				new StringParameter("ToDo Due", "todoDue"),
				new NumberParameter("Total", "total"),
				new RecurrenceParameter("Recurrence 1", "rec1"),
				new RecurrenceParameter("Recurrence 2", "rec2"),
			];

			const formName = await setBulkCreateView(dialogViewHandle, currentFolder.title, parameters);
			const result = await joplin.views.dialogs.open(dialogViewHandle);

			if (result.id === "create") {
				const bulkNotes = prepareBulkNotes(result.formData[formName], parameters);
				bulkNotes.forEach(async bulkNote => await createNoteFromBulkNote(currentFolder.id, bulkNote));
			}
		}

		await joplin.commands.register({
			name: "createBulkNotes",
			label: "Create bulk notes...",
			execute: async () => {
				await createBulkNotes();
			}
		});

		await joplin.views.menuItems.create('createBulkNotesMenuItem', 'createBulkNotes', MenuItemLocation.Tools);
	},
});
