import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom"
import { Layout, Menu } from 'antd-design-extend'
import { AsyncComponent } from '../components/AsyncComponent'
import Guard from './Guard'
import { routers } from './routers'
import './style.less'

const { Header, Content } = Layout

const initMenuList = list => list.map(v => ({
  key: v.key,
  name: v.name,
  to: v.to
}))

function Layouts(props) {
  const [menuList,] = useState(initMenuList(routers))
  const renderHeaderMenu = () => (<Menu
    className="header-center"
    theme="dark"
    mode="horizontal"
  // defaultSelectedKeys={[]}
  >
    {
      menuList.map(v => (
        <Menu.Item key={v.key}>
          <Link className="menu-item-box" to={v.to}>
            {v.name}
          </Link>
        </Menu.Item>
      ))
    }
  </Menu>)

  const renderContent = () => (routers.map(v => (<Guard
    key={v.key}
    exact={v.exact}
    path={v.path}
    component={AsyncComponent(() => import(`../${v.component}`))}
  />)))

  return (
    <BrowserRouter>
      <Switch>
        <>
          <Route exact path="/login" component={AsyncComponent(() => import("../pages/Login"))} />
          <Layout className="layout-container">
            <Header className="layout-container-header">
              <div className="logo-box">
                logo
						</div>
              {renderHeaderMenu()}
            </Header>
            <Content className="layout-container-body-content" >
              {renderContent()}
              <Route path="/404" component={AsyncComponent(() => import("../pages/NotFound"))} />
              <Route render={() => <Redirect to="/404" />} />
            </Content>
          </Layout>
        </>
      </Switch>
    </BrowserRouter>
  )
}

export default Layouts
