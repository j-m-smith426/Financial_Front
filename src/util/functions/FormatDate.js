import { endOfWeek, startOfWeek } from "date-fns"

export function formatDate(date) {
    const month = date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const dateFormated = date.getDate() >=9 ? date.getDate() : `0${date.getDate()}`
    return `${date.getFullYear()}-${month}-${dateFormated}`
}

export function getWeekRange(date) {
    const start = startOfWeek(date, { weekStartsOn: 1 })
    const end = endOfWeek(date, { weekStartsOn: 1 })

    return [formatDate(start), formatDate(end)]
}