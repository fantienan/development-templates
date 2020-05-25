// @ts-nocheck
import React from 'react'
import { Form, Input, Button, notification } from 'antd-design-extend'
import { useHistory, useLocation } from 'react-router-dom'
import io from './io'
import './style.less'

interface Props {
    [k: string]: any
}
interface Values {
    password: string
    user_name: string
}
export default (props: Props) => {
    const history = useHistory()
    const location = useLocation()
    const onFinish = async (values: Values) => {
        const res = await io.login(values).fetch()
        if (res.success) {
            localStorage.setItem('uc', JSON.stringify({
                userName: values.user_name
            }))
            const pathname = ((location.state || {}).from || {}).pathname || '/'
            history.push(pathname)
            return
        }
        notification.error({
            message: `请求错误`,
            description: res.msg
        })
    }
    return (
        <div className="login-page">
            <div className="logo"></div>
            <Form
                name="basic"
                onFinish={onFinish}
            >
                <Form.Item
                    label="账号"
                    name="user_name"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item className="submit">
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
