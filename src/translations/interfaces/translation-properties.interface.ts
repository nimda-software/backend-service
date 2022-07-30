export interface TranslationProperties {
  editedBy?: EditedBy[];
}

interface EditedBy {
  userId: number;
  date: Date;
  changeLogId: number;
}
