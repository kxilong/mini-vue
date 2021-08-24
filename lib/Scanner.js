export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        // 指针位置
        this.pos = 0
        // 尾巴:用于找寻当前指针位置是否检索到目标字符
        this.tail = this.templateStr
    }

    // 走过指定内容
    scan (tag) {
        if (this.tail.indexOf(tag) === 0) {
            this.pos += tag.length
            this.tail = this.templateStr.substring(this.pos)
        }
    }

    // 让指针进行扫描，知道遇到指定内容结束，并且能够返回结束之前路过的文字
    scanerUtils (stopTag) {
        const pos_backup = this.pos
        while (this.tail.indexOf(stopTag) !== 0 && this.pos < this.templateStr.length) {
            this.pos++
            this.tail = this.templateStr.substring(this.pos)
        }

        console.log(pos_backup, this.pos);
        return this.templateStr.substring(pos_backup, this.pos)
    }
}