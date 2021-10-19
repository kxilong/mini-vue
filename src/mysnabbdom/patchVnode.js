import createElm from "./createElm";
/**
 * 
 * @param {*旧节点对象} oldVnode 
 * @param {*新节点对象} newVnode 
 * 对比新旧对象的不同之处并进行不同的处理
 */
export default function patchVnode (oldVnode, newVnode) {
    // 如果两个节点相等则不进行处理
    if (oldVnode === newVnode) { return; }

    // 判断新的vnode有没有text属性
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length === 0)) {
        console.log("新节点有text属性");
        if (oldVnode.text != newVnode.text) {
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        console.log("新节点没有text属性");
        // 判断老的有没有children
        if (oldVnode.children != undefined && oldVnode.children.length > 0) {
            //进行真正的diff 算法优解
            let un = 0
            for (let i = 0; i < newVnode.children.length; i++) {
                let nCh = newVnode.children[i]
                let isExist = false
                for (let j = 0; j < oldVnode.children.length; j++) {
                    let oCh = oldVnode.children[j]
                    if (nCh.sel == oCh.sel && nCh.data.key == oCh.data.key) {
                        isExist = true
                    }
                }
                if (!isExist) {
                    // console.log(nCh, i);
                    let dom = createElm(nCh)
                    dom.elm = nCh
                    if (un > oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
                    } else {
                        // if (oldVnode.children[i]) {
                        //     oldVnode.elm.removeChild(oldVnode.children[i].elm)
                        // }
                        oldVnode.elm.appendChild(dom)
                    }
                } else {
                    un++;
                }
            }
        } else {
            oldVnode.elm.innerHTML = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElm(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}