export type TestPoint = {
    x: number,
    y: number,
    toArray(): [x: number, y: number],
    expected?: 0 | 1,
    actual?: number,
  }