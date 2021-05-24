/**
 * @file Menu.tsx
 * @author zhouqihang
 * @time 2021-05-21 17:08:30
 * @description 系统菜单组件
 */
import React, { CSSProperties, ReactNode, PureComponent } from 'react';
import classnames from 'classnames';
import Trigger from '../Trigger';
import Icon from '../Icon';

const prefix = 'os-menu';
type menuId = number | string;
interface IMenuItem {
  id: menuId;
  content: ReactNode,
  suffix?: ReactNode,
  children?: menuList;
}
type menuList = Array<IMenuItem | IMenuItem[]>;
type handlerType = 'click' | 'hover';
interface IMenuProps {
  className?: string;
  style?: CSSProperties;
  menus: menuList;
  handler?: (type: handlerType, id: menuId, item: IMenuItem) => void;
}

class Menu extends PureComponent<IMenuProps> {

  setPositions = (trigger: Element | null | Text, content: HTMLElement) => {
    if (!trigger || !content) {
      return {};
    }
    console.log(trigger, content);
    const container = content.parentElement as HTMLDivElement;
    const triggerRect = (trigger as Element).getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    console.log(triggerRect, containerRect);
    // 计算Y方向
    let top = triggerRect.bottom;     // 因为是系统菜单，所以默认在下方
    // 计算X方向
    let left = triggerRect.left;          // 默认和触发对象左对齐
    if (window.innerWidth - triggerRect.left < containerRect.width) {
      if (triggerRect.right >= containerRect.width) {
        left = triggerRect.right - containerRect.width;
      }
    }

    return { top, left }
  }

  renderItem = (menu: IMenuItem) => {
    const { id, content, suffix, children } = menu;
    const showSubMenu = children && !!children.length;

    const li = (
      <li key={id} className={classnames(
        prefix + '_item'
      )}>
        <div className={prefix + '_item__content'}>{content}</div>
        <div className={prefix + '_item__suffix'}>{suffix}</div>
        <div className={prefix + '_item__sub'}>
          {showSubMenu && <Icon name="right" />}
        </div>
      </li>
    );

    if (showSubMenu) {
      return (
        <Trigger
          key={'trigger' + id}
          trigger="click"
          content={this.renderMenu(children as menuList)}
          setPositions={this.setPositions}
        >
          {li}
        </Trigger>
      )
    }
    return li;
  }

  renderItemGroup = (menuList: IMenuItem[]) => {
    return menuList.map(menu => this.renderItem(menu));
  }

  renderMenu = (data: menuList) => {
    return (
      <ul
        className={classnames(
          prefix
        )}
      >
        {
          data.map((item: IMenuItem | IMenuItem[]) => {
            if (Array.isArray(item)) {
              return this.renderItemGroup(item);
            }
            else {
              return this.renderItem(item);
            }
          })
        }
      </ul>
    )
  }
  render() {
    const { className, style, children, menus } = this.props;
    return (
      <Trigger trigger="click" content={this.renderMenu(menus)} setPositions={this.setPositions}>
        {children}
      </Trigger>
    )
  }
}

export default Menu;