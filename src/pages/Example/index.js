import React from 'react'
import { Button, Custom } from 'antd-design-extend'
import schema from 'async-validator-extend'
import io from './io'
import Store from './store'
import { useLocalStore, Observer, useObserver } from 'mobx-react'
import { useQuery } from 'react-query'
const { Form } = Custom

export default function Example(props) {
    const [count, setCount] = React.useState(1)
    const store = useLocalStore(() => new Store())
    const rules = [{ required: true, message: '请输入密码!' }]
    const { status, data, error } = useQuery('todos', fetchTodoList)
    function fetchTodoList(...argus) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ data: 1232 })
            }, 2000)
        })
    }
    // 初始值 
    const initialValues = {
        // date: '2017-08-08',
        // range: ['2017-08-08', '2017-08-18'],
    };

    // 字段值更新时触发回调事件
    const onValuesChange = (changedValues, allValues) => {

    }

    const createParam = (site, params) => ({
        data: {
            tableName: "FL_SYS_ZQSJZD",
            queryFilter: {
                whereString: `I_JB=${site}`,
            },
            ...params
        }
    })

    function getList({ originalObject, site, name } = {}) {
        if (site) {
            const param = createParam(site)
            return io.getEntityList(param).fetch()
        }
        const param = createParam(undefined, {
            queryFilter: {
                whereString: "1=1",
                addCaptionField: false
            }
        })
        return new Promise(async resolve => {
            const { data } = await io.getEntityList(param).fetch()
            store.treeList = data
            resolve({ data })
        })
    }

    // 二维数组 第一维度：级联分组；第二维度：级联层级
    const cascade = [["province", "city", "county", "village", "hamlet"]]
    const getMock = () => {
        io.mock().fetch()
    }
    const goto = () => {
        props.history.push('/404')
    }
    React.useEffect(() => {
        return () => {
            store.destroy()
        }
    })
    return (
        <div>
            <Button onClick={() => setCount(count + 1)}>count ++({count})</Button>
            <Button onClick={() => store.addChildCount()}>
                childCount ++
                (<Child store={store} />)
            </Button>
            <Button onClick={() => store.addBrotherCount()}>
                brotherCount ++
                (<Brother store={store} />)
            </Button>
            <Button onClick={getMock}>mock</Button>
            <Button onClick={goto}>404</Button>
            <Form
                scope={store}
                onValuesChange={onValuesChange}
                initialValues={initialValues}
                cascade={cascade} // 表单项有级联菜单 则必须传，不传则没有级联查询效果
                getList={getList}
            >
                <table>
                    <tbody>
                        <tr>
                            <td className="title">政区</td>
                            <td>
                                <Form.Item
                                    name="admin"
                                    type='SELECT_TREE'
                                    list={store.treeList}
                                />
                            </td>
                            <td className="title">密码</td>
                            <td>
                                <Form.Item
                                    name="name"
                                    rules={rules}
                                    type='INPUT_PASSWORD'
                                // disabled={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">编号</td>
                            <td>
                                <Form.Item
                                    name="code"
                                    type='SELECT'
                                    // list={selectList}
                                    rules={schema.custom.rules.required()}
                                    mode='multiple'
                                />
                            </td>
                            <td className="title">邮箱</td>
                            <td>
                                <Form.Item
                                    name="email"
                                    rules={schema.custom.rules.email()}
                                    type='INPUT'
                                />
                            </td>
                            <td className="title">编码</td>
                            <td>
                                <Form.Item
                                    name="number"
                                    rules={schema.custom.rules.required()}
                                    type='INPUT'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">年龄</td>
                            <td>
                                <Form.Item
                                    name="age"
                                    type='INPUT_NUMBER'
                                    min={0}
                                    max={10}
                                />
                            </td>
                            <td className="title">日期</td>
                            <td>
                                <Form.Item
                                    name="date"
                                    type='DATE_PICKER'
                                />
                            </td>

                            <td className="title">日期范围</td>
                            <td>
                                <Form.Item
                                    name="range"
                                    type='RANGE_PICKER'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">图片</td>
                            <td colSpan='5'>
                                <Form.Item
                                    name="img"
                                    type='UPLOAD'
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    maximum={2}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td className="title">描述</td>
                            <td colSpan='5'>
                                <Form.Item
                                    name="desc"
                                    type='TEXT_AREA'
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="title">科目</td>
                            <td colSpan='3'>
                                <Form.Item
                                    name="subject"
                                    type='CHECKBOX_GROUP'
                                // list={checkList}
                                />

                            </td>
                            <td className="title">性别</td>
                            <td>
                                <Form.Item
                                    name="sex"
                                    type='RADIO_GROUP'
                                // list={radioList}
                                />

                            </td>
                        </tr>
                        <tr>
                            <td className="title">省</td>
                            <td>
                                <Form.Item
                                    name="province"
                                    type='SELECT'
                                    rules={schema.custom.rules.required()}
                                />
                            </td>
                            <td className="title">市</td>
                            <td>
                                <Form.Item
                                    name="city"
                                    type='SELECT'
                                    rules={schema.custom.rules.required()}
                                />
                            </td>
                            <td className="title">县</td>
                            <td>
                                <Form.Item
                                    name="county"
                                    type='SELECT'
                                    rules={schema.custom.rules.required()}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="title">乡</td>
                            <td>
                                <Form.Item
                                    name="village"
                                    type='SELECT'
                                    rules={schema.custom.rules.required()}
                                />
                            </td>
                            <td className="title">村</td>
                            <td>
                                <Form.Item
                                    name="hamlet"
                                    type='SELECT'
                                    rules={schema.custom.rules.required()}
                                />
                            </td>
                            <td className="title">文件</td>
                            <td>
                                <Form.Item
                                    name="file"
                                    type='UPLOAD_FILE'
                                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                    maximum={2}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
    )
}

function Child(props) {
    return useObserver(() => (
        <span>
            {props.store.childCount}
        </span>
    ))
}

function Brother(props) {
    return <Observer>{() => (
        <span>{props.store.brotherCount}</span>
    )}</Observer>
}
