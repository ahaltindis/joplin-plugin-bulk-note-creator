import { BulkProperties } from "src/types";

export class Parameter {
  protected title: string;
  protected name: string;

  constructor(title: string, name: string) {
    this.title = title;
    this.name = name;
  }

  protected toInputHTML(): string {
    return '';
  }

  public toHTML(): string {
    return `
    <div class="inputContainer">
        <div class="inputTitle">
            ${this.title}
        </div>
        <div>
          ${this.toInputHTML()}
        </div>
    </div>
  `;
  }

  public processInput(input: BulkProperties, raw: Record<string, string>): BulkProperties {
    return {
      ...input,
      [this.name]: raw[this.name]
    }
  }
}