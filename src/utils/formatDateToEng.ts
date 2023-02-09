interface Return {
  year: number
  month: string
  day: number
}

export const formatDateToEng = (date: Date): Return => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const getMonthName = (d: Date): string => months[new Date(d).getMonth()]

  const day = new Date(date).getDate()
  const month = getMonthName(date)
  const year = new Date(date).getFullYear()

  return { year, month, day }
}
