// 判断是否为对象
export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

// 判断对象是否含有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}

export function def (data, key, value, enumerable) {
    Object.defineProperty(data, key, {
        configurable: true,
        writable: true,
        enumerable,
        value
    })
}

// 解析基础路径
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
export function parsePath (path) {
    if (bailRE.test(path)) {
        return
    }
    var segments = path.split('.')
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj) { return; }
            obj = obj[segments[i]]
        }
        return obj
    }
}