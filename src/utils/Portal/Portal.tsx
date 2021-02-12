/**
 * @file Portal.tsx
 * @author zhouqihang
 * @time 2021-02-12 18:55:51
 * @description Portal组件
 */
import React, { FunctionComponent, CSSProperties, HTMLProps } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { createContainer } from './_utils';

const prefix = 'os-portal';
interface IPortalProps {
  className?: string;
  style?: CSSProperties;
}

const Portal: FunctionComponent<IPortalProps & HTMLProps<HTMLDivElement>> = (props) => {
  const { className, style, children, ...otherProps } = props;
  const container = createContainer(prefix, prefix);

  const content = (
    <div className={classnames(`${prefix}-container`, className)} style={style} {...otherProps}>
      {children}
    </div>
  );

  return createPortal(
    content,
    container
  )
}

export default Portal;