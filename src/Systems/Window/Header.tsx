/**
 * @file Header.tsx
 * @author zhouqihang
 * @time 2021-06-04 14:34:01
 * @description 窗口顶部组件
 */
import React, { FunctionComponent, CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';

const prefix = 'os-window_header';
interface IHeaderProps {
  className?: string;
  style?: CSSProperties;
}

const Header: FunctionComponent<IHeaderProps> = (props) => {
  const { className, style, children, ...others } = props;
  return (
    <div
      className={classnames(
        prefix,
        className
      )}
      style={style}
      {...others}
    >
      <div className={prefix + '__handers'}>
        <span className={prefix + '__handers_close'}>
        </span>
        <span className={prefix + '__handers_shrink'}>
        </span>
        <span className={prefix + '__handers_magnify'}></span>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

Header.displayName = "Window.Header";

export default Header;