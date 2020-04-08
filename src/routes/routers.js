// 路由
import { AsyncComponent } from '../components/AsyncComponent'

export const routers = [
    {
        key: '1',
        name: 'example',
        to: '/example',
        path: '/example',
        component: AsyncComponent(() => import("../pages/Example")),
        exact: true,
        children: [],
    }
]