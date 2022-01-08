import { BulkProperties } from "src/types";
import { Parameter } from "./base";

export class StringParameter extends Parameter {

  protected toInputHTML(): string {
    return `<input name="${this.name}" type="text"></input>`;
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    return {
      ...input,
      [this.name]: raw[this.name]
    }
  }
}
