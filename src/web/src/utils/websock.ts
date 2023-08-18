import { WebsocketBuilder } from 'websocket-ts'

import { useMenuStore } from '@/stores/menuStore'

export const ws = new WebsocketBuilder(import.meta.env.VITE_SOCKET_SERVER_URL)
    .onMessage((i, e) => {
        const { updateRouterMenu } = useMenuStore()
        const obj = JSON.parse(e.data)
        console.log('menu:', e, obj)
        if (obj.type === 'routerMenu') {
            updateRouterMenu(obj.data)
        }
    })
    // eslint-disable-next-line no-console
    .onError((i, e) => { console.warn('websock has error...' + e) })
    // .withBackoff(new ConstantBackoff(1000))
    .build()