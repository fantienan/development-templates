// 路由守卫
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { DEFAULT_ROUTER_PATH } from '../routes/routers'
import { getCookie } from '@/utils/tools'

export default (props: RouteProps) => {
    const token = localStorage.getItem("token") || (getCookie() as {[k: string]: string}).token 
    const isRoot = window.location.pathname === '/'
    if (token) {
        return <>
            {props.path === DEFAULT_ROUTER_PATH && isRoot ? <Redirect
                path='/'
                to={{
                    pathname: DEFAULT_ROUTER_PATH,
                    state: { from: props.location }
                }}
            /> : null}
            <Route
                path={props.path}
                component={props.component}
                exact={props.exact}
            />
        </>
    }
    return (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )
}
