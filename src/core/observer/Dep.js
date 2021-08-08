var uid = 0;
export default class Dep {
    constructor() {
        console.log("我是DEP类的构造器");
        this.id = uid++
        /**
         * 用数组存储自己的订阅者
         * 这个数组里面存放的是Watcher的实例
         */
        this.subs = []
    }

    // 添加订阅
    addSub (sub) {
        this.subs.push(sub)
    }

    // 添加依赖
    depend () {
        // Dep.taeget就是一个我们自己指定的全局位置，你用window.target也行，只要是全局唯一，没有歧义就行
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    // 添加依赖
    notify () {
        var subs = this.subs.slice();

        for (var i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}