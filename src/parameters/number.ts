import { BulkProperties } from "src/types";
import { Parameter } from "./base";

export class NumberParameter extends Parameter {

  protected toInputHTML(): string {
    return `<input name="${this.name}" type="number" min="0"></input>`;
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    return {
      ...input,
      [this.name]: Number.parseFloat(raw[this.name])
    }
  }
}
