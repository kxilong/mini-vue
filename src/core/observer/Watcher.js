import { parsePath } from '../util'
import Dep from './Dep';

var uid = 0;
export default class Watcher {
    constructor(target, expression, callback) {
        console.log("我是Watcher类的构造器");
        this.id = uid++
        this.target = target
        this.getter = parsePath(expression)
        this.callback = callback
        this.value = this.get()
    }

    update () {
        this.run()
    }

    get () {
        // 进入依赖收集阶段
        Dep.target = this

        var obj = this.target

        let value;
        // 只要能找，就一直找
        try {
            value = this.getter(obj)
        } finally {
            Dep.target = null
        }

        return value
    }

    run () {
        this.getAndInvoke(this.callback)
    }

    getAndInvoke (cb) {
        const value = this.get()

        if (value !== this.value || typeof value === 'object') {
            const oldValue = this.value
            this.value = value
            cb.call(this.target, value, oldValue)
        }
    }
}