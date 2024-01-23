import {Word} from "../word";
import {Date} from "../date";

export interface WordLearnCategoryResponse {
  category: string,
  endedAt: null | Date,
  id: string,
  startedAt: null | Date,
  userId: string
  words: Word[]
}
