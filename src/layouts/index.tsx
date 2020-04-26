import * as React from 'react'
import { Layout, Menu } from 'antd-design-extend'
import { Link, useLocation } from "react-router-dom"
import { Routers } from '../routes/routers'
import Popover from './Popover'
import './style.less'

interface Props {
    routes: Routers[]
    [k: string]: any
}

const { Header, Content } = Layout
const initMenuList = (list: Routers[]) => list.map(v => ({
    key: v.key,
    name: v.name,
    to: v.to,
    popover: v.popover
}))

export default (props: Props) => {
    const { routes } = props
    const location = useLocation();
    const [menuList,] = React.useState(routes ? initMenuList(routes) : [])
    const selectedKeys = React.useCallback(() =>
        routes
            .filter(v => location.pathname === v.path)
            .map(v => v.key),
        [location.pathname, routes]
    )

    const renderHeaderMenu = () => (<Menu
        className="header-center"
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys()}
    >
        {menuList.map(v => {
            return (<Menu.Item key={v.key} className={`_${v.key}`}>
                <Popover popover={v.popover}>
                    {
                        v.to ? <Link className="menu-item-box" to={v.to}>
                            {v.name}
                        </Link> : <span className="menu-item-box uc">{v.name}</span>
                    }
                </Popover>
            </Menu.Item>)
        })}
    </Menu>)
    return (
        <>
            <Layout className="layout-container">
                <Header className="layout-container-header">
                    <div className="logo-box">logo</div>
                    {renderHeaderMenu()}
                </Header>
                <Content className="layout-container-body-content" >
                    {props.children}
                </Content>
            </Layout>
        </>
    )
}