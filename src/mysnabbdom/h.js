import vnode from './vnode'

export default function (sel, data, c) {
    if (arguments.length != 3) {
        throw new Error("这是一个低配版h函数，必须传三个参数")
    }

    if (typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) {
        let children = []
        for (var i = 0; i < c.length; i++) {
            if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error("数组中h函数有第三个参数有误")
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        let children = [c]
        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error("传入的第三个参数类型不对")
    }
}