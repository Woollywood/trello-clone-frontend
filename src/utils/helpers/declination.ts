/**
 *
 * @param one слова для числительных, оканчивающихся на 1
 * @param two слова для числительных, оканчивающихся на 2, 3 или 4
 * @param five слова для числительных, оканчивающихся на 0, 5, 6, 7, 8 или 9
 * @param number число для склонения
 * @returns вернет склоненное слово
 * @description функция предназначена для склонения слов в зависимости от числительного
 */
export function declination(
  one: string,
  two: string,
  five: string,
  number?: number
) {
  if (!number && number !== 0) {
    return ''
  }

  let n = Math.abs(number)
  n %= 100
  if (n >= 5 && n <= 20) {
    return five
  }
  n %= 10
  if (n === 1) {
    return one
  }
  if (n >= 2 && n <= 4) {
    return two
  }
  return five
}
