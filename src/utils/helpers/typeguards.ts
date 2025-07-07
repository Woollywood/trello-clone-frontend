/**
 *
 * @param x значение, ожидает число
 * @returns возвращает булевое значение в зависимости от число или нет
 */
export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number'
}
