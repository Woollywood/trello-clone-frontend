/**
 *
 * @param values массив строк, которые нужно объединить
 * @param separator строка-разделитель, по умолчанию равна пробелу
 * @returns возвращает объединенную строку
 */
export const combineString = (
  values: (string | null | undefined)[],
  separator = ' '
) => {
  return values.filter(Boolean).join(separator)
}

/**
 *
 * @param str строка, которую нужно очистить
 * @param arg подстрока, которую нужно удалить
 * @returns возвращает очищенную строку, из которой удалены все вхождения подстроки arg
 */
export const sanitizeStr = (str = '', arg: string) => {
  if (!str) return ''

  return str
    .split(arg)
    .filter((arg) => Boolean(arg.trim()))
    .join(arg)
}

/**
 *
 * @param str строка
 * @returns возвращает строку, в которой первая буква стала прописной
 */
export const capitilazeStr = (str: string) => {
  const firstLetter = str.charAt(0).toUpperCase()

  return firstLetter + str.slice(1)
}
