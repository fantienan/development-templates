// 路由守卫
import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export default (props: RouteProps) => {
    const token = localStorage.getItem('token')
    if (token) {
        return <Route
            path={props.path}
            component={props.component}
            exact={props.exact}
        />
    }
    return (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )
}
