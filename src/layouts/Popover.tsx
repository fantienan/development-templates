import React from 'react'
import { Popover } from 'antd-design-extend'

interface Props {
    children?: JSX.Element
    popover?: boolean
    [k: string]: any
}

export default (props: Props) => {
    return (<>
        {
            props.popover ? <Popover
                content={<p>....</p>}
                placement="bottom"
            >
                {props.children}
            </Popover> : props.children
        }
    </>)
}
