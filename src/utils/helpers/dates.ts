/**
 *
 * @returns возвращает дату yearAgoDate (год назад) и currentDate (текущую дату)
 */

export const getRangeDateOneYear = () => {
  const currentDate = new Date()
  const yearAgoDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  return {
    start: yearAgoDate,
    end: currentDate,
  }
}

/**
 *
 * @param date принимает объект даты
 * @returns возвращает преобразованную дату из формата UTC в локальную дату
 */
export const convertUTCToLocalDate = (date: Date | null) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  return date
}

/**
 *
 * @param date принимает объект даты
 * @returns возвращает преобразованную локальной дату в формате UTC
 */
export const convertLocalToUTCDate = (date: Date | null) => {
  if (!date) {
    return date
  }
  date = new Date(date)
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return date
}
