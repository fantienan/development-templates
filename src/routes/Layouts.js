import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, withRouter } from "react-router-dom"
import { AsyncComponent } from '../components/AsyncComponent'
import Guard from './Guard'
import { routers } from './routers'

function Layouts(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={AsyncComponent(() => import("../pages/Login"))} />
        {
          routers.map(v => {
            const Cmp = v.component
            return (
              <Guard
                key={v.key}
                exact={v.exact}
                path={v.path}
                component={Cmp}
              />
            )
          })
        }
        <Route path="/404" component={AsyncComponent(() => import("../pages/NotFound"))} />
        <Route render={() => <Redirect to="/404" />} />
      </Switch>
    </BrowserRouter>
  )
}

export default Layouts
