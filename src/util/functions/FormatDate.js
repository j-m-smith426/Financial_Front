export function formatDate(date) {
    const month = date.getMonth() >= 9 ? date.getMonth()+1: `0${date.getMonth()+1}`
    return `${date.getFullYear()}-${month}-${date.getDate()}`
}