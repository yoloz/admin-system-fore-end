import { App, Plugin } from 'vue'

import UedTable from './src/main.vue'

UedTable.name = 'UedTable'

export const UedTablePlugin: Plugin = {
    install (app: App) {
        app.component(UedTable.name, UedTable)
    }
}

export { UedTable }