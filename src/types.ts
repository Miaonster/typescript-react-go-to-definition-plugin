export type Rule = string | {
  file: string,
  definition: string,
}

export interface SynchronizedConfiguration {
  remove?: Rule[]
  forceRemove?: Rule[]
}
