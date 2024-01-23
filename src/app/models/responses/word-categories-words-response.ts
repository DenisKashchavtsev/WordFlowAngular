import {Word} from "../word";

export interface WordCategoriesWordsResponse {
  data: Word[],
  resultCount: number,
  totalPages: number
}
