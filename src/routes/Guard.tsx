// 路由守卫
import React from 'react'
import { Route, Redirect, RouteProps, withRouter } from 'react-router-dom'

function Guard(props: RouteProps): JSX.Element {
    console.log(props)
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

export default withRouter(Guard)
