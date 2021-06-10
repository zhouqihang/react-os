/**
 * @file Header.tsx
 * @author zhouqihang
 * @time 2021-06-04 14:34:01
 * @description 窗口顶部组件
 */
import React, { FunctionComponent, CSSProperties } from 'react';
import classnames from 'classnames';

export const prefix = 'os-window_header';

export interface IHeaderEvents {
  onClose?: React.MouseEventHandler<HTMLSpanElement>;
  onShrink?: React.MouseEventHandler<HTMLSpanElement>;
  onMagnify?: React.MouseEventHandler<HTMLSpanElement>;
}
interface IHeaderProps extends IHeaderEvents {
  className?: string;
  style?: CSSProperties;
}

const Header: FunctionComponent<IHeaderProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, style, children, onClose, onShrink, onMagnify, ...others } = props;
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
        <span className={prefix + '__handers_close'} onClick={onClose}>
        </span>
        <span className={prefix + '__handers_shrink'} onClick={onShrink}>
        </span>
        <span className={prefix + '__handers_magnify'} onClick={onMagnify}></span>
      </div>
      <div className={prefix + '__content'}>
        {children}
      </div>
    </div>
  )
}

Header.displayName = "Window.Header";

export default Header;