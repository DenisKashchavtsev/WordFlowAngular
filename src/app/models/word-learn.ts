import {Word} from "./word";

export interface WordLearn extends Word {
  learned: boolean | undefined,
  attempts: number | undefined,
}
