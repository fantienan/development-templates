# 项目模板

## 启动项目
`yarn start ` or `npm run start`

## build
`yarn build` or  `npm run build`

## 单元测试
`yarn test` or `npm run test`

## ts代码检测
`yarn type-check` or `npm run type-check`
> 参考App.test.tsx

## mock server
`yarn mock-server` or `npm run mock-server`

```jsx 
/**
 * 1. 接口声明
 * 2. mock只能用get请求
 * 3. 请求地址前缀/mock
 * **/
import ioContext from '../../utils/http/io-context';

ioContext.create('example', {
    mock: {
        url: '/mock/action.json',
        method: "GET"
    },
})
export default ioContext.api.example

/**
 * 调用
 * **/
io.mock().fetch()
```
