/**
 * @file Popup.tsx
 * @author zhouqihang
 * @time 2021-02-12 19:32:38
 * @description 弹出框组件
 */
import React, { FunctionComponent, CSSProperties, useEffect } from 'react';
import classnames from 'classnames';

import Portal from '../../utils/Portal';

const prefix = 'os-popup';
interface IPopupProps {
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  mounted?: () => void;
}

const Popup: FunctionComponent<IPopupProps> = (props) => {
  const { className, style, visible, children, mounted } = props;

  useEffect(() => {
    mounted && mounted();
  }, []);
  return (
    <Portal style={{ display: visible ? 'block' : 'none' }}>
      <div className={classnames(prefix, className)} style={style}>
        {children}
      </div>
    </Portal>
  )
}

export default Popup;