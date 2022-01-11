import { Parameter } from "./base";

export class BigStringParameter extends Parameter {

  protected toInputHTML(): string {
    return `<textarea name="${this.name}" rows="4"></textarea>`;
  }
}
