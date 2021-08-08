import { def } from '../util'

const arraryProto = Array.prototype
export const arrayMethods = Object.create(arraryProto)

const methodsToPatch = [
    'push',
    'pop',
    'unshift',
    'shift',
    'splice',
    'sort',
    'reverse'
]


methodsToPatch.forEach((methodName) => {
    // 备份一份数组方法
    const orignal = arraryProto[methodName]
    // 理解 arrayMethods[methodName] = function mutator(...args) {}
    def(arrayMethods, methodName, function mutator (...args) {
        const result = orignal.apply(this, args)
        let ob = this.__ob__
        let inserted;
        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }

        if (inserted) {
            ob.observeArray(inserted)
        }
        console.log("执行数组变异方法");
        // notify change
        ob.methodsToPatch.notify()
        return result
    })
})

