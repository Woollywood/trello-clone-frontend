/**
 *
 * @param obj объект
 * @param filterFunc функция фильтр
 * @returns возращает отфильтрованный объект
 * @description функция фильтрует объект по ключам, используя заданную функцию-фильтр, и возвращает новый объект, содержащий только отфильтрованные ключи и соответствующие значения
 */
export const filterObjectByKeys = (
  obj: { [key: string]: unknown },
  filterFunc: (key: string) => boolean
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => filterFunc(key))
  )
}
