export type optionalPropsTypes<T> = {
    [K in keyof T]?: T[K]
  }