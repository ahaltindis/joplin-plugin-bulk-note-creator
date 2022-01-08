import joplin from "api";
import * as moment from "moment";
import { Parameter } from "./parameters";
import { BulkNote, BulkProperties, Recurrence } from "./types";

export const createNoteFromBulkNote = async (folderId: string, note: BulkNote): Promise<void> => {
  await joplin.data.post(["notes"], null, {
    parent_id: folderId,
    title: note.title,
    body: note.body,
    is_todo: note.isTodo,
    todo_due: note.todoDue
  });
}

const calculateNextDay = (n: number, rec: Recurrence): moment.Moment => {
  // TODO
  return moment(new Date().getTime());
}

const fillVariables = (template: string, n: number, rec1?: Recurrence, rec2?: Recurrence): string => {
  let processed = template;

  const rec1Calculated = rec1 ? calculateNextDay(n, rec1) : undefined;
  const rec2Calculated = rec2 ? calculateNextDay(n, rec2) : undefined;

  const regex = /\{(?<var>[^}|]*)[|]?(?<opt>[^}]*)\}/g;
  const foundVariables = [...new Set(template.match(regex))];

  foundVariables.forEach(providedVar => {
    const parts = providedVar.replace('{','').replace('}','').split('|')
    const variable = parts[0];
    const options = parts[1];

    if (variable === 'n') {
      if (options) {
        // not supported yet. TODO
        return;
      } else {
        processed = processed.replace(providedVar, (n+1).toString());
        return;
      }
    }

    if (variable === 'rec1' && rec1Calculated) {
      processed = processed.replace(providedVar, rec1Calculated.format(options));
      return;
    }

    if (variable === 'rec2' && rec2Calculated) {
      processed = processed.replace(providedVar, rec2Calculated.format(options));
      return;
    }
  });

  return processed;
}

export const prepareBulkNotes = (rawData: Record<string, string>, parameters: Parameter[]): BulkNote[] => {
  console.info("creating bulk notes with rawData: " + JSON.stringify(rawData));

  let bulkProperties: BulkProperties = {
    titleTemplate: '',
    bodyTemplate: '',
    isTodo: 0,
    total: 0
  };

  parameters.forEach(parameter => bulkProperties = parameter.processInput(bulkProperties, rawData));

  console.info("creating bulk notes with bulkProperties: " + JSON.stringify(bulkProperties));

  return Array.from(Array(bulkProperties.total)).map((_, n) => {
    return {
      title: fillVariables(bulkProperties.titleTemplate, n, bulkProperties.rec1, bulkProperties.rec2),
      body: fillVariables(bulkProperties.bodyTemplate, n, bulkProperties.rec1, bulkProperties.rec2),
      isTodo: bulkProperties.isTodo
    }
  });
}
