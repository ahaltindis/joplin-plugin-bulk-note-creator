import { BulkProperties } from "src/types";
import { Parameter } from "./base";

const parseCheckboxValue = (value: string): 0 | 1 => {
  return value === "on" ? 1 : 0;
}

export class RecurrenceParameter extends Parameter {

  protected toInputHTML(): string {
    return `
      <input name="${this.name}DateTime" type="datetime-local"></input>
      <div class="recurrenceDay">
        Mon: <input name="${this.name}DayMon" type="checkbox">
        Tue: <input name="${this.name}DayTue" type="checkbox">
        Wed: <input name="${this.name}DayWed" type="checkbox">
        Thu: <input name="${this.name}DayThu" type="checkbox">
        Fri: <input name="${this.name}DayFri" type="checkbox">
        Sat: <input name="${this.name}DaySat" type="checkbox">
        Sun: <input name="${this.name}DaySun" type="checkbox">
      </div>
    `;
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    return {
      ...input,
      [this.name]: {
        inputDateTime: raw[this.name + 'DateTime'],
        enabledDays: [
          parseCheckboxValue(raw[this.name + 'DayMon']),
          parseCheckboxValue(raw[this.name + 'DayTue']),
          parseCheckboxValue(raw[this.name + 'DayWed']),
          parseCheckboxValue(raw[this.name + 'DayThu']),
          parseCheckboxValue(raw[this.name + 'DayFri']),
          parseCheckboxValue(raw[this.name + 'DaySat']),
          parseCheckboxValue(raw[this.name + 'DaySun']),
        ]
      }
    }
  }

}
