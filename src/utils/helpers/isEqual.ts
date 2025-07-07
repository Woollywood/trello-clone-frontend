export const isEqual = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj1: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj2: Record<string, any>
): boolean =>
  Object.keys({ ...obj1, ...obj2 }).every((key) => {
    if (
      obj1[key] &&
      obj2[key] &&
      typeof obj1[key] === 'object' &&
      typeof obj2[key] === 'object'
    ) {
      return isEqual({ ...obj1[key] }, { ...obj2[key] })
    }
    return obj1[key] === obj2[key]
  })
