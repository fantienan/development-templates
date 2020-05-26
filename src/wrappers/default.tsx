import React, { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { setCookie } from '../utils/tools'

interface Props {
    [k: string]: any
}

export default (props: Props) => {
    const location = useLocation()
    const history = useHistory()
    useEffect(() => {
        // 免登陆
        const { search = '' } = location
        const pattern = new RegExp(/^(.*)(\?token=)([^?&]{1,})(.*)/g)
        if (pattern.test(search)) {
            // 设置token
            setCookie('token', RegExp.$3)
            localStorage.setItem("token", RegExp.$3)
            const patt = new RegExp(/^(.*)(&redirect=)([^?&]{1,})(.*)/g)
            if (patt.test(search)) {
                history.push(RegExp.$3)
            }
        } else {
            history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div className="default"></div>
}