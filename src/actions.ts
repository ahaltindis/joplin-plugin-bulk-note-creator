import joplin from "api";
import * as moment from "moment";
import 'moment-recur';
import { Parameter } from "./parameters";
import { BulkNote, BulkProperties, Recurrence } from "./types";

export const createNoteFromBulkNote = async (folderId: string, noteRequest: BulkNote): Promise<void> => {
  const note = await joplin.data.post(["notes"], null, {
    parent_id: folderId,
    title: noteRequest.title,
    body: noteRequest.body,
    is_todo: noteRequest.isTodo,
  });

  const todoDue = Number.parseFloat(noteRequest.todoDue);
  if (noteRequest.isTodo === 1 && Number.isInteger(todoDue)) {
    // It doesn't work if we send in the post api. Not sure bug or feature!
    await joplin.data.put(['notes', note.id], null, { todo_due: todoDue });
  }
}

const generateRecurrenceDates = (rec: Recurrence, total: number): moment.Moment[] => {
  const weekdays = rec.enabledDays.map((val, i) => {
    if (val === 0) {
      return "";
    }
    let day = '';
    day = i === 0 ? 'mon' : day;
    day = i === 1 ? 'tue' : day;
    day = i === 2 ? 'wed' : day;
    day = i === 3 ? 'thu' : day;
    day = i === 4 ? 'fri' : day;
    day = i === 5 ? 'sat' : day;
    day = i === 6 ? 'sun' : day;
    return day;
  }).filter(v => v !== "");

  return (moment as any)(new Date(rec.inputDate)).recur().every(weekdays).daysOfWeek().next(total);
}

const fillVariables = (template: string, n: number, rec1Dates?: moment.Moment[], rec2Dates?: moment.Moment[]): string => {
  let processed = template;

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

    if (variable === 'rec1' && rec1Dates) {
      processed = processed.replace(providedVar, rec1Dates[n].format(options));
      return;
    }

    if (variable === 'rec2' && rec2Dates) {
      processed = processed.replace(providedVar, rec2Dates[n].format(options));
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

  const rec1Dates = bulkProperties.rec1 ? generateRecurrenceDates(bulkProperties.rec1, bulkProperties.total) : undefined;
  const rec2Dates = bulkProperties.rec2 ? generateRecurrenceDates(bulkProperties.rec2, bulkProperties.total) : undefined;

  return Array.from(Array(bulkProperties.total)).map((_, n) => {
    return {
      title: fillVariables(bulkProperties.titleTemplate, n, rec1Dates, rec2Dates),
      body: fillVariables(bulkProperties.bodyTemplate, n, rec1Dates, rec2Dates),
      isTodo: bulkProperties.isTodo,
      todoDue: bulkProperties.todoDue ? fillVariables(bulkProperties.todoDue, n, rec1Dates, rec2Dates) : undefined,
    }
  });
}
