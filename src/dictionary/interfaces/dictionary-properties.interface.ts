export interface DictionaryProperties {
  editedBy?: EditedBy[];
  source?: string;
}

interface EditedBy {
  userId: number;
  date: Date;
  changeLogId: number;
}
