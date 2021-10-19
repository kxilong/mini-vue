export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        // 指针位置
        this.pos = 0
        // 尾巴，用于得到指针是否到需要截取的位置
        this.tail = templateStr
    }

    // 走过指定的内容
    scan (tag) {
        if (!tag) { return }
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length
        }
    }

    // 让指针进行扫描，知道遇到指定内容结束，并且能够返回结束之前路过的文字
    scannerUtils (stopTag) {
        let pos_backup = this.pos
        while (this.tail.indexOf(stopTag) !== 0 && this.eos()) {
            this.pos++
            this.tail = this.templateStr.substring(this.pos)
        }
        return this.templateStr.substring(pos_backup, this.pos)
    }

    eos () {
        return this.pos < this.templateStr.length
    }
}