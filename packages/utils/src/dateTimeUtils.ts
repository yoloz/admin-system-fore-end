import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import _relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(_relativeTime)
dayjs.locale('zh-cn')

/**
 * 最近一天
 * @returns 开始时间 - 结束时间
 */
export const getLastDay = (): Array<Date> => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24)
    return [start, end]
}
/**
 * 最近一周
 * @returns 开始时间 - 结束时间
 */
export const getLastWeek = (): Array<Date> => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    return [start, end]
}
/**
 * 最近一月
 * @returns 开始时间 - 结束时间
 */
export const getLastMonth = (): Array<Date> => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    return [start, end]
}
/**
 * 最近三月
 * @returns 开始时间 - 结束时间
 */
export const getLast3Month = (): Array<Date> => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3)
    return [start, end]
}
/**
 * 最近一年
 * @returns 开始时间 - 结束时间
 */
export const getLastYear = (): Array<Date> => {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 12)
    return [start, end]
}

/**
 * Element 快捷选项
 */
export const ElementShortcuts: Array<{ text: string, value: Date[] }> = [
    { text: '近一天', value: getLastDay() },
    { text: '近7天', value: getLastWeek() },
    { text: '近30天', value: getLastMonth() },
    { text: '近90天', value: getLast3Month() },
    { text: '近一年', value: getLastYear() }
]

export const formatDate = (dateTime: any, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
    if (!dateTime) return '无'
    return dayjs(dateTime).format(format)
}

export const relativeTime = (dateTime: Date | undefined) => {
    return dayjs(dateTime).fromNow()
}