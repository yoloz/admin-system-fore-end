
import { App, Plugin } from 'vue'

import { version } from './package.json'
import { UedTablePlugin } from './packages/ued-table/index'

const UedPlugin: Plugin | any = {
    version,
    install(app: App) {
        UedTablePlugin.install?.(app)
    }
}

export default UedPlugin

export * from './packages/ued-table/index'