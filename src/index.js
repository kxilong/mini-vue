import { observe } from './core/observer'
import Watcher from './core/observer/Watcher'
import { SSG_TemplateEngine } from '../lib/index'

let obj = {
    a: {
        m: {
            n: 1
        }
    },
    b: [1, 2, 3, 4, [1, 1]]
}

// observe(obj)
// new Watcher(obj, 'a.m.n', (value, oldValue) => {
//     console.log("☆☆☆☆☆☆", value, oldValue);
// })
// obj.a.m.n = 88
// console.log(obj);


/**
 * mustache库测试
 */
const templateStr = "我今天买了一个{{thing}},好{{mood}}啊"
const data = {
    thing: '华为手机',
    mood: '开心'
}
SSG_TemplateEngine.render(templateStr, data)
