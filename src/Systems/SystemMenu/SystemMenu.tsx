/**
 * @file SystemMenu.tsx
 * @author zhouqihang
 * @time 2021-05-21 17:08:30
 * @description 系统菜单组件
 */
import React, { CSSProperties, PureComponent } from 'react';
import Trigger from '../../components/Trigger';
import Menu from '../../components/Menu';
import { menuListType, IMenuItem } from '../../components/Menu/Menu';

const prefix = 'os-systemMenu';

interface ISystemMenuProps {
  className?: string;
  style?: CSSProperties;
  menus: menuListType;
  // handler?: (type: handlerType, id: menuId, item: IMenuItem) => void;
}

class SystemMenu extends PureComponent<ISystemMenuProps> {

  setPositions = (trigger: Element | null | Text, content: Element | null | Text) => {
    if (!trigger || !content) {
      return {};
    }

    const container = content.parentElement as HTMLDivElement;
    const triggerRect = (trigger as Element).getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

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

  renderMenu = (data: menuListType) => {
    return (
      <Menu menus={data} />
    )
  }
  render() {
    const { children, menus } = this.props;
    return (
      <Trigger trigger="click" content={this.renderMenu(menus)} setPositions={this.setPositions}>
        {children}
      </Trigger>
    )
  }
}

export default SystemMenu;