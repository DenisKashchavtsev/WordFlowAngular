import {Category} from "../category";

export interface WordCategoriesResponse {
  data: Category[],
  resultCount: number,
  totalPages: number
}
