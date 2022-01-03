import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { setBulkCreateView } from './views/bulkCreateView';
import { createNote } from './actions'


joplin.plugins.register({
	onStart: async function() {
		const dialogViewHandle = await joplin.views.dialogs.create("dialog");

		await joplin.commands.register({
			name: "createBulkNotes",
			label: "Create bulk notes",
			execute: async () => {
				const currentFolder = await joplin.workspace.selectedFolder();

				setBulkCreateView(dialogViewHandle, currentFolder.title);

				const result = await joplin.views.dialogs.open(dialogViewHandle);
				console.info('Dialog result: ' + JSON.stringify(result));
				if (result.id === "create") {
					await createNote(currentFolder.id, "title", "body", 0);
				}
			}
		});

		await joplin.views.menuItems.create('createBulkNotesMenuItem', 'createBulkNotes', MenuItemLocation.Tools);
	},
});
