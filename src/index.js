import { observe } from './core/observer'
import Watcher from './core/observer/Watcher'
import { SSG_TemplateEngine } from '../lib/index'
import lookup from '../lib/lookup'
import h from './mysnabbdom/h'
import patch from './mysnabbdom/patch'
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
                    <li>{{.}}</li>
 * mustache库测试
 */
// const templateStr = `
//     <div>
//         <ol>
//             {{#students}}
//             <li>
//                 学生{{name}}的爱好是
//                 <ol>
//                     {{#hobbies}}
//                     <li class="ul-class">{{.}}</li>
//                     {{/hobbies}}
//                 </ol>
//             </li>
//             {{/students}}
//         </ol>
//     </div>
// `
// const data = {
//     students: [
//         { 'name': '小明', 'hobbies': ['游泳', '剑圣'] },
//         { 'name': '小红', 'hobbies': ['游泳', '剑圣', '亚索'] },
//         { 'name': '小白', 'hobbies': ['游泳', '剑圣', '盲僧'] }
//     ]
// }

// const templateStr = "我好{{mood}},{{mood}}也爱我"
// const data = {
//     mood: '开心'
// }
// document.write(SSG_TemplateEngine.render(templateStr, data))
// const lookUpData = {
//     a: {
//         b: {
//             c: 1
//         }
//     }
// }

// console.log(lookup(lookUpData, 'a.b.c'));



// 低配版h函数测试
var myVode1 = h('ul', { key: 1 }, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
])
var myVode2 = h('ul', { key: 1 }, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'M' }, 'M'),
    h('li', { key: 'N' }, 'N'),
    h('li', { key: 'P' }, 'P'),
    h('li', { key: 'Q' }, 'Q'),
])
const elem = document.getElementById("container")
const btn = document.getElementById("btn")

patch(elem, myVode1)

btn.onclick = function () {
    patch(myVode1, myVode2)
}