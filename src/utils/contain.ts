type callbackType = (element: HTMLElement) => boolean;
type elementType = HTMLElement | null;
/**
 * 判断给定的element是否包含在一个指定的节点中，通过回调函数确定被比较节点的特征
 * 如果完成一次向上查找之后没有找到满足条件的节点，则返回false
 * @param element 
 * @param cb 
 * @returns boolean
 */
export function containElement(element: elementType, cb: callbackType) {
  let node: elementType | null = element;
  while (node && node.parentElement) {
    if (cb(node)) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}