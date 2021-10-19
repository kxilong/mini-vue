export default function lookup (dataObj, keyName) {
    let sections = keyName.split('.')
    if (!keyName) throw '缺少keyName参数'
    let temp = dataObj
    if (keyName.indexOf('.') != -1 && keyName != '.') {
        for (let i = 0; i < sections.length; i++) {
            temp = temp[sections[i]]
        }
        return temp
    }

    return dataObj[keyName]
}