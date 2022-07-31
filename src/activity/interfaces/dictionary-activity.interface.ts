export type DictionaryActivityType = DictionaryCreated | DictionaryUpdated | DictionaryDeleted;

export interface DictionaryCreated {
  createdBy: number;
  dictionaryUUID: string;
}

export interface DictionaryUpdated<T = unknown> {
  updatedBy: number;
  oldValue: T;
  dictionaryUUID: string;
}

export interface DictionaryDeleted {
  deletedBy: number;
  dictionaryUUID: string;
}
