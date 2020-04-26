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

const routers: Routers[] = [
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
        component: "pages/Login",
        exact: true,
      }
    ]
  },
  {
    key: '404',
    path: '/404',
    component: 'utils/404',
  }
]
export default routers