import { observe } from './core/observer'
import Watcher from './core/observer/Watcher'

let obj = {
    a: {
        m: {
            n: 1
        }
    },
    b: [1, 2, 3, 4, [1, 1]]
}

observe(obj)
new Watcher(obj, 'a.m.n', (value) => {
    console.log("☆☆☆☆☆☆", value);
})
obj.a.m.n = 88
