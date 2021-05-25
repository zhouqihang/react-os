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
import { glassBackground } from '../../assets/styles/classNames';

const prefix = 'os-menu';
type menuId = number | string;
export interface IMenuItem {
  id: menuId;
  content: ReactNode,
  suffix?: ReactNode,
  children?: menuListType;
}
export type menuListType = Array<IMenuItem | IMenuItem[]>;
export type handlerType = 'click' | 'hover';
interface IMenuProps {
  className?: string;
  style?: CSSProperties;
  menus: menuListType;
  handler?: (type: handlerType, id: menuId, item: IMenuItem) => void;
}

class Menu extends PureComponent<IMenuProps> {

  setPositions = (trigger: Element | null | Text, content: Element | null | Text) => {
    if (!trigger || !content) {
      return {};
    }
    console.log(trigger, content);
    const container = content.parentElement as HTMLDivElement;
    const triggerRect = (trigger as Element).getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    console.log(triggerRect, containerRect);
    // 计算X方向坐标
    let left = triggerRect.right; // 默认为触发对象右边
    // 触发对象右边至窗口最右侧空间不够，移动到左侧
    if (window.innerWidth - triggerRect.right < containerRect.width) {
      left = triggerRect.left - containerRect.width;
    }
    // 计算Y方向
    let top = triggerRect.top;     // 默认与触发对象平齐
    if (window.innerHeight - triggerRect.top < containerRect.height) {
      if (triggerRect.bottom > containerRect.height) {
        top = window.innerHeight - containerRect.height;
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
          content={(<Menu menus={menu.children as menuListType} />)}
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

  render() {
    const { menus } = this.props;
    return (
      <ul
        className={classnames(
          prefix,
          glassBackground
        )}
      >
        {
          menus.map((item: IMenuItem | IMenuItem[]) => {
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
}

export default Menu;