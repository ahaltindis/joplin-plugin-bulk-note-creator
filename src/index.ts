import joplin from 'api';
import { MenuItemLocation } from 'api/types';
import { setBulkCreateView } from './views/bulkCreateView';


joplin.plugins.register({
	onStart: async function() {
		const dialogViewHandle = await joplin.views.dialogs.create("dialog");

		await joplin.commands.register({
			name: "createBulkNotes",
			label: "Create bulk notes",
			execute: async () => {
				setBulkCreateView(dialogViewHandle);

				const result = await joplin.views.dialogs.open(dialogViewHandle);
				console.info('Dialog result: ' + JSON.stringify(result));
			}
		});

		await joplin.views.menuItems.create('createBulkNotesMenuItem', 'createBulkNotes', MenuItemLocation.Tools);
	},
});
