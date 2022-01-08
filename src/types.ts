
export interface BulkProperties {
  titleTemplate: string;
  bodyTemplate: string;
  isTodo: 0 | 1;
  total: number;
}

export interface BulkNote {
  title: string;
  body: string;
  isTodo: 0 | 1;
  todoDue?: number;
}
