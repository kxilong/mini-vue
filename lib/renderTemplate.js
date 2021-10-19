import lookup from './lookup'
/**
 * 
 * 函数的功能是让tokens数组转变成为dom字符串
 */

export default function renderTemplate (tokens, data) {
    let resultStr = "";
    for (var i = 0; i < tokens.length; i++) {
        const token = tokens[i]
        if (token[0] === 'text') {
            resultStr += token[1]
        } else if (token[0] === 'name') {
            resultStr += lookup(data, token[1])
        } else if (token[0] === '#') {
            resultStr += parseArray(token, data)
        }
    }
    return resultStr
}

function parseArray (token, data) {
    let v = lookup(data, token[1])
    let resultStr = ''
    for (var i = 0; i < v.length; i++) {
        resultStr += renderTemplate(token[2], {
            ...v[i],
            '.': v[i]
        })
    }
    return resultStr
}