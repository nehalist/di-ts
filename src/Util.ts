/**
 * Type for what object is instances of
 */
export interface Type<T> {
  new(...args: any[]): T;
}

/**
 * Generic `ClassDecorator` type
 */
export type GenericClassDecorator<T> = (target: T) => void;
