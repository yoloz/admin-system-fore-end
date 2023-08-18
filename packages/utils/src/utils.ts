import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

export const downloadBlobFile = (file: any, fileName: string, type = 'application/vnd.ms-excel'): boolean => {
    if (!file) return false
    const blob = new Blob([file], { type })
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = URL.createObjectURL(blob)
    a.download = `${fileName}-${dayjs().format('YYYYMMDDHHmmss')}`
    a.click()
    URL.revokeObjectURL(a.href)
    return true
}

/**
 * 修改浏览器地址栏标题
 * @param text 标题
 */
export const changeDocumentTitle = (text: string): void => {
    document.title = text
}
/**
 * 修改浏览器地址栏logo
 * @param link logo路径
 */
export const changeDocumentFavicon = (link: string): void => {
    const favicon: HTMLLinkElement | null = document.querySelector('link[rel="icon"]')
    if (favicon !== null) favicon.href = link
    if (favicon === null) {
        const cFavicon: HTMLLinkElement = document.createElement('link')
        cFavicon.rel = 'icon'
        cFavicon.href = link
        document.head.appendChild(cFavicon)
    }
}

/**
 * 压缩图片
 * @param img 被压缩的img对象
 * @param type 压缩后转换的文件类型
 * @param mx 触发压缩的图片最大宽度限制
 * @param mh 触发压缩的图片最大高度限制
 * @param quality 图片质量
 */
export const compressImg = (image: HTMLImageElement, type: string, mx: number, mh: number, quality: number = 1) => {
    return new Promise((resolve) => {
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d')
        const { width, height }: HTMLImageElement = image
        let targetWidth = width
        let targetHeight = height
        if (width > mx || height > mh) {
            if (width / height > 1) {
                targetWidth = mx
                targetHeight = Math.round(mx * (height / width))
            } else {
                targetHeight = mh
                targetWidth = Math.round(mh * (width / height))
            }
        }
        canvas.width = targetWidth
        canvas.height = targetHeight
        context?.clearRect(0, 0, targetWidth, targetHeight)
        // 图片绘制
        context?.drawImage(image, 0, 0, targetWidth, targetHeight)

        canvas.toBlob((blob: Blob | null) => resolve(blob), type || 'image/png', quality)
    })
}

/**
 * 查找字符串指定出现的次数的位置
 * @param str 字符串
 * @param cha 字符
 * @param num 出现次数
 * @returns
 */
export const findStrIndexOf = (str: string, cha: string, num: number) => {
    let x = str.indexOf(cha)
    for (let i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1)
    }
    return x
}

/**
 * 深拷贝
 * @param sourceData
 * @returns
 */
export const deepCopy = <T extends unknown>(sourceData: T): T => {
    if (Array.isArray(sourceData)) {
        return sourceData.map(item => deepCopy(item)) as T
    }
    const obj: T = {} as T
    for (const key in sourceData) {
        if ((typeof sourceData[key] === 'object') && sourceData[key] !== null) {
            obj[key] = deepCopy(sourceData[key])
        } else {
            obj[key] = sourceData[key]
        }
    }
    return obj
}