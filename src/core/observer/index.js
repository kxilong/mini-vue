
import { isObject, hasOwn, def } from '../util'
import { arrayMethods } from './array'
import Dep from './Dep'
export class Observer {
    constructor(value) {
        // 这是__ob__ 属性
        this.dep = new Dep()
        def(value, '__ob__', this, false)
        if (Array.isArray(value)) {
            Object.setPrototypeOf(value, arrayMethods)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    walk (obj) {
        for (let i in obj) {
            defineReactive(obj, i)
        }
    }

    observeArray (items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }
}

export function observe (value) {
    // 非对象 和 VNode 实例不做响应式
    if (!isObject(value)) {
        return
    }

    let ob;
    // 判断是否有 __ob__ 属性
    if (hasOwn(value, '__ob__')) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

// 定义数据监测
export function defineReactive (data, key, value) {
    const dep = new Dep()
    if (arguments.length === 2) {
        value = data[key]
    }

    let childOb = observe(data[key])
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get () {
            console.log(`试图访问${key}`);
            // 如果现在处于收集依赖阶段
            if (Dep.target) {
                dep.depend()
                if (childOb) {
                    childOb.dep.depend()
                }
            }
            return value
        },
        set (newValue) {
            console.log(`试图设置${key}`);
            value = newValue
            childOb = observe(newValue)
            dep.notify()
        }
    })
}

