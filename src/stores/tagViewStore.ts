import { defineStore } from 'pinia'

interface TagView {
    path: any
    query: any
    name: any
}

export const useTagsViewStore = defineStore('tagview', {
    state: () => {
        return {
            visitedViews: [] as TagView[]
        }
    },
    getters: {
        getVistedViews(state) {
            return state.visitedViews
        }
    },
    actions: {
        addVisitedView(view: any) {
            // 判断添加的标签存在直接返回
            if (this.visitedViews.some((v) => v.path === view.path)) return
            // 添加的数量如果大于 6,则替换最后一个元素，否则在visitedViews数组后插入一个元素
            if (this.visitedViews.length >= 6) {
                this.visitedViews.pop()
                this.visitedViews.push(
                    Object.assign({}, view)
                )
            } else {
                this.visitedViews.push(
                    Object.assign({}, view)
                )
            }
        },
        delVisitedView(view: any) {
            return new Promise((resolve) => {
                // 匹配view.path元素将其删除
                for (const [i, v] of this.visitedViews.entries()) {
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1)
                        break
                    }
                }
                resolve([...this.visitedViews])
            })
        },
        delOthersVisitedViews(view: any) {
            return new Promise((resolve) => {
                this.visitedViews = this.visitedViews.filter((v) => {
                    return v.path === view.path
                })
                resolve([...this.visitedViews])
            })
        }
    }
})