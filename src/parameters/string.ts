import { Parameter } from "./base";

export class StringParameter extends Parameter {

  protected toInputHTML(): string {
    return `<input name="${this.name}" type="text"></input>`;
  }
}
