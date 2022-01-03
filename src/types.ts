
export interface BulkProperties {
  titleTemplate: string;
  bodyTemplate: string;
  isTodo: 0 | 1;
  total: string;
}

export interface BulkNote {
  title: string;
  body: string;
  isTodo: 0 | 1;
  todoDue?: number;
}
