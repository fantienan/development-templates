// 路由配置
export interface Routers {
  key: string
  name?: string
  to?: string
  path: string
  component: string | (() => any)
  exact?: boolean
  wrappers?: string[]
  redirect?: string
  routes?: any[]
  [k: string]: any
}

export const DEFAULT_ROUTER_PATH = '/xxx'
export const routers: Routers[] = [
  /* @create-app-script-split-start*/
  {
    key: 'login',
    to: 'login',
    path: '/login',
    component: 'pages/Login',
    exact: true,
  },
  {
    key: "layouts",
    path: "/",
    component: "layouts",
    routes: [
      {
        key: 'example',
        name: 'example',
        to: '/example',
        path: '/example',
        component: "pages/Example",
        exact: true,
        // wrappers: [
        //   'wrappers/Auth',
        // ]
      },
      {
        key: 'uc',
        name: 'uc',
        path: '/uc',
        popover: true,
        exact: true,
      }
    ]
  },
  {
    key: '404',
    path: '/404',
    component: 'utils/404',
  }
  /* @create-app-script-split-end*/
]