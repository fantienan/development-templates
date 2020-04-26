# 项目模板

## 启动项目

`yarn start` or `npm run start`

## build

`yarn build` or `npm run build`

## 单元测试

`yarn test` or `npm run test`

> 参考 App.test.tsx

## ts 代码检测

`yarn type-check` or `npm run type-check`

## mock server

`yarn mock` or `npm run mock`


```jsx
/**
 * 1. 接口声明
 * 2. mock只能用get请求
 * 3. 请求地址前缀/mock
 * **/
import ioContext from "../../utils/http/io-context";

ioContext.create("example", {
  mock: {
    url: "/mock/action.json",
    method: "GET",
  },
});
export default ioContext.api.example;

/**
 * 调用
 * **/
io.mock().fetch();
```

## [react-query](https://github.com/tannerlinsley/react-query?utm_source=gold_browser_extension#usepaginatedquery)

> 用于在 React 中获取、缓存和更新异步数据的钩子

```jsx
import { useQuery } from "react-query";

export default function Example() {
  const { status, data, error } = useQuery("todos", fetchTodoList);
  function fetchTodoList(...argus) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: "Hello!" });
      }, 2000);
    });
  }
  return (
    <div>
      {status === "loading" ? (
        <span>Loading...</span>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
}
```

## example

> src/pages/Example/index.js

## 路由

> src/routes/routers.ts

配置子路由，通常在需要为多个路径增加 layout 组件时使用。


```ts
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
]
export default routers
```

## 布局

> src/layouts


## 提交代码

1. 安装 [commitizen](https://github.com/commitizen/cz-cli.git)

`
yarn add commitizen -g `or` npm install commitizen -g
`
2. 接下来，通过输入以下命令，初始化您的项目以使用cz-convention -changelog适配器:

`
commitizen init cz-conventional-changelog --save-dev --save-exact
`

或者你用的是yarn:

`
commitizen init cz-conventional-changelog --yarn --dev --exact
`