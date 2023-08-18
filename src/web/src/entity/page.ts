export namespace Page {
    // 入参
    export interface RequestForm {
        // 页数
        pageNumber?: number
        // 每页行数
        pageSize?: number
        // 数据总量
        totalRow?: number
    }
    // mybatis-flex
    export interface ResponseData<T> {
        records: Array<T>
        // 每页行数
        pageSize: number
        // 当前页
        pageNumber: number
        // 是否为最后一页
        isLastPage: boolean
        // 总页数
        totalPage: number
        // 数据总量
        totalRow: number
    }
}