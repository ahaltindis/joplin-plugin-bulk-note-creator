import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { setBulkCreateView } from './views/bulkCreateView';
import { createNoteFromBulkNote, prepareBulkNotes } from './actions'


joplin.plugins.register({
	onStart: async function() {
		const dialogViewHandle = await joplin.views.dialogs.create("dialog");

		const createBulkNotes = async () => {
			const currentFolder = await joplin.workspace.selectedFolder();
			setBulkCreateView(dialogViewHandle, currentFolder.title);
			const result = await joplin.views.dialogs.open(dialogViewHandle);

			if (result.id === "create") {
				console.info('Dialog result: ' + JSON.stringify(result));
				const bulkNotes = prepareBulkNotes(result.formData.bulkProperties);
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
