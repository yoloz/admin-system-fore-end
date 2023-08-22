import { WebsocketBuilder } from 'websocket-ts'

import { useMenuStore } from '@/stores/menuStore'

export const ws = new WebsocketBuilder(import.meta.env.VITE_SOCKET_SERVER_URL)
    .onMessage((_ins, e) => {
        const { updateRouterMenu } = useMenuStore()
        const obj = JSON.parse(e.data)
        if (obj.type === 'routerMenu') {
            updateRouterMenu(obj.data)
        }
    })
    .onError((_ins, e) => {
        // eslint-disable-next-line no-console
        console.warn('websock has error...' + e)
    })
    // .withBackoff(new ConstantBackoff(100))
    .build()