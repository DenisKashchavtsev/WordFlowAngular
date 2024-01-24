export interface WordLearn {
  id: string,
  source: string,
  translate: string,
  currentStep: number | null,
  learned: boolean | undefined,
  variants: string[] | undefined,
  attempts: number | undefined
}
