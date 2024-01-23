export interface Word {
  id: string,
  source: string,
  translate: string,
  learned: boolean | undefined,
  variants: string[] | undefined
}
