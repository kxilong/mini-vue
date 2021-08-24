import Scanner from './Scanner'

export const SSG_TemplateEngine = {
    // 渲染方法
    render (templateStr, data) {
        const scanner = new Scanner(templateStr)
        while (scanner.pos < templateStr.length - 1) {
            let word = scanner.scanerUtils("{{")
            scanner.scan("{{")

            word = scanner.scanerUtils("}}")
            scanner.scan("}}")
            console.log(word);
        }
    }
}