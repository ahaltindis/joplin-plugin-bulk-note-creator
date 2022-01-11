import { BulkProperties } from "src/types";
import { Parameter } from "./base";

export class RecurrenceParameter extends Parameter {

  protected toInputHTML(): string {
    return `
      <input name="${this.name}Date" type="date"></input>
      <div class="recurrenceDay">
        Mon:<input name="${this.name}DayMon" type="checkbox" value="mon"> |
        Tue:<input name="${this.name}DayTue" type="checkbox" value="tue"> |
        Wed:<input name="${this.name}DayWed" type="checkbox" value="wed"> |
        Thu:<input name="${this.name}DayThu" type="checkbox" value="thu"> |
        Fri:<input name="${this.name}DayFri" type="checkbox" value="fri"> |
        Sat:<input name="${this.name}DaySat" type="checkbox" value="sat"> |
        Sun:<input name="${this.name}DaySun" type="checkbox" value="sun">
      </div>
    `;
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    if (raw[this.name + 'Date'] === "") {
      return input;
    }

    const enabledDays = [
      raw[this.name + 'DayMon'],
      raw[this.name + 'DayTue'],
      raw[this.name + 'DayWed'],
      raw[this.name + 'DayThu'],
      raw[this.name + 'DayFri'],
      raw[this.name + 'DaySat'],
      raw[this.name + 'DaySun'],
    ].filter(v => typeof v === 'string');

    return {
      ...input,
      [this.name]: {
        inputDate: raw[this.name + 'Date'],
        enabledDays
      }
    }
  }

}
