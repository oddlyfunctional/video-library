export type Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const expectType = <T>(_: T): void => {};
