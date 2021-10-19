export default function createElm (vnode) {
    // 创建DOM节点，这个节点现在还是孤儿节点
    let domNode = document.createElement(vnode.sel)
    if (vnode.text !== '' && (vnode.children == undefined || vnode.children.length == 0)) {
        domNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        // 内部是子节点，就要递归创建节点
        for (let i = 0; i < vnode.children.length; i++) {
            let ch = vnode.children[i]
            let chDom = createElm(ch)
            domNode.appendChild(chDom)
        }
    }
    vnode.elm = domNode
    return vnode.elm
}

/**
 * var myVode1 = h('ul', { key: 1 }, [
    h('li', {}, '哈哈'),
    h('li', {}, '嘻嘻'),
    h('li', {}, '呵呵'),
    h('li', {}, h('ol', {}, [
        h('li', {}, '哈哈'),
        h('li', {}, '嘻嘻'),
        h('li', {}, '呵呵'),]))
])
 */