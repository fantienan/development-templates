// 状态管理
import { observable, action } from 'mobx'

export default class Store {
    @observable childCount = 1
    @observable brotherCount = 1
    treeList = undefined
    @action addChildCount() {
        this.childCount += 1
    }
    @action addBrotherCount() {
        this.brotherCount += 1
    }
}