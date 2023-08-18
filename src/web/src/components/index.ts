import { App } from 'vue'

import BaseTable from './table/base-table.vue'
import BaseTableToolbar from './table/base-table-toolbar.vue'
import BaseTag from './tag/base-tag.vue'
import BaseTagGroup from './tag/base-tag-group.vue'
import BaseCard from './base-card.vue'
import BaseCollapse from './base-collapse.vue'
import BaseChart from './base-chart.vue'
import SysFooter from './sys-footer.vue'
import BaseTitle from './base-title.vue'
import BaseTableLayout from './base-table-layout.vue'
import BaseFormLayout from './base-form-layout.vue'
import BaseHeaderLayout from './base-header-layout.vue'

export const globalComponent = (app: App<Element>): void => {
    app.component('custom-table', BaseTable)
    app.component('custom-table-toolbar', BaseTableToolbar)

    app.component('custom-tag', BaseTag)
    app.component('custom-tag-group', BaseTagGroup)

    app.component('custom-card', BaseCard)
    app.component('custom-collapse', BaseCollapse)
    app.component('custom-echarts', BaseChart)
    app.component('custom-footer', SysFooter)
    app.component('custom-title', BaseTitle)

    app.component('custom-form-layout', BaseFormLayout)
    app.component('custom-header-layout', BaseHeaderLayout)
    app.component('custom-table-layout', BaseTableLayout)
}