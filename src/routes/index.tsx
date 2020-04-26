import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { AsyncComponent } from '../components/AsyncComponent'
import {routers} from './routers'
import Guard from '../wrappers/Guard'

// 不需要路由守卫
const exclude = ['/login']
export default () => {
    const renderRouter = (routes = routers) => (routes.map(({
        key,
        exact,
        path,
        component,
        routes,
        ...reset
    }) => {
        const Cmp = AsyncComponent(() => import(`../${component}`))
        // 路由守卫
        const Guideboard = exclude.includes(path) ? Route : Guard
        return <Guideboard
            key={key}
            exact={exact}
            path={path}
            component={() => <Cmp routes={routes} >{routes ? renderRouter(routes) : null}</Cmp>}
            {...reset}
        />
    }))
    return (<BrowserRouter>
        <Switch>
            {renderRouter()}
        </Switch>
    </BrowserRouter>)
}
