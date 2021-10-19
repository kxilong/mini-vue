import vnode from "./vnode"
import createElm from './createElm'
import patchVnode from './patchVnode'
export default function (oldNode, newNode) {
    // 判断oldNode 是否为虚拟节点
    if (!oldNode.sel) {
        oldNode = emptyNodeAt(oldNode)
    }

    // 判断是否为相同节点
    if (sameVnode(oldNode, newNode)) {
        // 需要精细化对比
        console.log("是同一个节点");
        patchVnode(oldNode, newNode)
    } else {
        // 直接上上树
        console.log("不是同一个节点，暴力插入新的，删除旧的");
        let nodeElm = createElm(newNode)
        oldNode.elm.insertBefore(nodeElm, nodeElm.elm)
    }
}

function emptyNodeAt (elm) {
    return vnode(elm.tagName.toLowerCase(), {}, [], undefined, elm)
}

function sameVnode (vnode1, vnode2) {
    const isSameKey = vnode1.data.key === vnode2.data.key;
    const isSameIs = vnode1.data?.is === vnode2.data?.is;
    const isSameSel = vnode1.sel === vnode2.sel;

    return isSameSel && isSameKey && isSameIs;
}