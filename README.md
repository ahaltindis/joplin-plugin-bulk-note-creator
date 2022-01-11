# joplin-plugin-bulk-note-creator

This is a simple plugin to be able to create bulk notes in Joplin.

## Usage
Currently below variables can be used anywhere in Note title, body and the todo due (but this will discard any non number value).

|variable |options|example|
|---|---|---|
|n | none | `{n}` - 1, 2, 3...|
|rec1 | all formatting options supported by [moment.js](https://momentjs.com/docs/#/displaying/format/) | `{rec1\|YYYY-MM-DD}` - 2022-01-16|
|rec2 | same ^ | `{rec2\|x}` - 1642550400000|

This input
```text
Note Title: week {n} - {rec1|YYYY-MM-DD}
Note Body: dummy
Is ToDo: Yes
ToDo Due: {rec2|x}
Total: 5
Recurrence 1: 16/01/2022 (Mon: checked)
Recurrence 2: 16/01/2022 (Sun: checked)
```

will create (title/body/ToDo Due):
- week 1 - 2022-01-17 / dummy / 2022-01-23
- week 2 - 2022-01-24 / dummy / 2022-01-30
- week 3 - 2022-01-31 / dummy / 2022-02-06
- week 4 - 2022-02-07 / dummy / 2022-02-13
- week 5 - 2022-02-14 / dummy / 2022-02-20

## Motivation
I sometimes need to create many to-dos with a template and fill them only when I need them. I was planning to use Joplin data API first from a bash script but then I wanted to familiarize myself to plugin architecture too, therefore I decided to create this basic plugin. I am influenced by [template plugin](https://github.com/joplin/plugin-templates) for the code structure.

The current state is satisfying what I need but there might be some improvement if it gets any attention.

Few ideas for improvement:
- Add unit tests.
- Support modifying {n} as integer (e.g. support usage of {n+1}).
- Support other recurrence options that `moment-recur` library supports.
- Add recurrence parameters dynamically to dialog box.
- Show preview of the notes before creating them.
- Support adding tags


## Development
To build the plugin, simply run `npm run dist`.
More on: https://joplinapp.org/api/get_started/plugins/
