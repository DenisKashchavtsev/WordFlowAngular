import {Date} from "../date";
import {WordLearn} from "../word-learn";

export interface WordLearnCategoryResponse {
  category: string,
  endedAt: null | Date,
  id: string,
  startedAt: null | Date,
  userId: string
  words: WordLearn[]
}
