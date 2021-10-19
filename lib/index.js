import parseTemplateToToken from './parseTemplateToToken'
import renderTemplate from './renderTemplate'

export const SSG_TemplateEngine = {
    // 渲染方法
    render (templateStr, data) {
        var tokens = parseTemplateToToken(templateStr)
        // 将tokens数组转换成dom字符串
        var domStr = renderTemplate(tokens, data)
        console.log(domStr);
        return domStr
    }
}