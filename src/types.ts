
export interface Recurrence {
  inputDate: string;
  enabledDays: string[];  // ["mon", "tue" ...]
}

export interface BulkProperties {
  titleTemplate: string;
  bodyTemplate: string;
  isTodo: 0 | 1;
  todoDue?: string;
  total: number;
  rec1?: Recurrence
  rec2?: Recurrence
}

export interface BulkNote {
  title: string;
  body: string;
  isTodo: 0 | 1;
  todoDue?: string;
}
