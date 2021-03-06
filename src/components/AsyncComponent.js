import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd-design-extend'

const LoadingComponent = (props) => {
  const { isLoading, error, pastDelay } = props
  // Handle the loading state
  if (isLoading) {
    return <Spin />
  } else if (error) {
    console.log(error)
    return <div className="loading">加载页面失败，请刷新后重试.</div>
  } else if (pastDelay) {
    return <Spin />
  } else {
    return null
  }
}
export const AsyncComponent = (importComponent, loading = LoadingComponent) => {
  return Loadable({
    loader: importComponent,
    loading,
    delay: 300,
  })
}

