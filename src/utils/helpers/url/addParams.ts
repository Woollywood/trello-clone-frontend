import { stringify } from 'querystring'

/**
 *
 * @param base строка
 * @param params объект с параметрами запроса в виде ключ-значение
 * @returns функция позволяет добавить параметры запроса к базовому URL, создавая новый URL с этими параметрами
 */
export const addSearchParams = (
  base: string,
  params: Record<string, string>
) => {
  return `${base}?${stringify({ ...params })}`
}
