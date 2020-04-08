import React from 'react'
import { Button } from 'antd'
import io from './io'
import Store from './store'
import { useLocalStore, Observer, useObserver } from 'mobx-react'

export default function Example() {
    const [count, setCount] = React.useState(1)
    const store = useLocalStore(() => new Store())
    const requset = async () => {
        const param = {
            data: {
                pageInfo: {
                    pageIndex: 1,
                    pageSize: 5
                },
                tableName: 'STUDENT',
                queryFilter: {}
            }
        }
        await io.pageSelect(param).fetch()
    }
    return (
        <div>
            <Button onClick={requset}>请求接口</Button>
            <Button onClick={() => setCount(count + 1)}>count ++</Button>
            <Button onClick={() => store.addChildCount()}>childCount ++</Button>
            <Button onClick={() => store.addBrotherCount()}>brotherCount ++</Button>
            <div>{count}</div>
            <Child store={store} />
            <Brother store={store} />
        </div>
    )
}

function Child(props) {
    return useObserver(() => (
        <div>
            {props.store.childCount}
        </div>
    ))
}

function Brother(props) {
    return <Observer>{() => (
        <div>{props.store.brotherCount}</div>
    )}</Observer>
}
