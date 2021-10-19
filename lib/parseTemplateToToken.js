import Scanner from './Scanner'
import nestToken from './nestToken'
/**
 * 将模板字符串变为tokens数组
 */
export default function parseTemplateToToken (templateStr) {
    var tokens = []
    // 创建扫描器
    var scanner = new Scanner(templateStr)
    var words;
    while (scanner.eos()) {
        // 收集字符之前经过的内容
        words = scanner.scannerUtils("{{")
        tokens.push(["text", words])
        // 跳过目标字符串，继续进行扫描
        scanner.scan("{{")

        // 收集字符之前经过的内容
        words = scanner.scannerUtils("}}")
        if (words) {
            if (words[0] === '#') {
                tokens.push(["#", words.substring(1)])
            } else if (words[0] === '/') {
                tokens.push(["/", words.substring(1)])
            } else {
                tokens.push(["name", words])
            }
        }
        // 跳过目标字符串，继续进行扫描
        scanner.scan("}}")
    }
    return nestToken(tokens)
}