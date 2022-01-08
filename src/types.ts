
export interface Recurrence {
  inputDate: string;
  enabledDays: number[];  // [0, 0, 0, 0, 0, 0, 0] starts with Monday.
}

export interface BulkProperties {
  titleTemplate: string;
  bodyTemplate: string;
  isTodo: 0 | 1;
  total: number;
  rec1?: Recurrence
  rec2?: Recurrence
}

export interface BulkNote {
  title: string;
  body: string;
  isTodo: 0 | 1;
  todoDue?: number;
}
