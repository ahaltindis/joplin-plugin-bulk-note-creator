import { BulkProperties } from "src/types";
import { Parameter } from "./base";

export class BinaryParameter extends Parameter {
  private zeroTitle: string;
  private oneTitle: string;

  constructor(title: string, name: string, zeroTitle: string, oneTitle: string) {
    super(title, name);

    this.zeroTitle = zeroTitle;
    this.oneTitle = oneTitle;
  }

  protected toInputHTML(): string {
    return `
      <select name="${this.name}">
          <option value="0">${this.zeroTitle}</option>
          <option value="1">${this.oneTitle}</option>
      </select>
    `
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    return {
      ...input,
      [this.name]: raw[this.name] === '0' ? 0 : 1
    }
  }
}
