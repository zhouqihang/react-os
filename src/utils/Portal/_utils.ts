/**
 * @file _utils.ts
 * @author zhouqihang
 * @time 2021-02-12 18:59:31
 * @description Portal工具类
 */

/**
 * 创建Portal根DOM
 * @param id div id
 * @param className div class
 */
export function createContainer(id: string, className: string) {
  let container = document.querySelector(`#${id}`);
  if (container) {
    return container;
  }
  container = document.createElement('div');
  container.setAttribute('id', id);
  container.classList.add(className);
  const body = document.querySelector('body');
  if (!body) {
    throw new Error('there is no body element!');
  }
  body.appendChild(container);
  return container;
}