/**
 * @description 图标组件
 * @author zhouqihang
 * 
 * 所有图标均来自iconfont，以symbol方式引用
 */
import React, { FunctionComponent, SVGProps } from 'react';

export interface IconProps {
  name: string;
}

const iconPrefix = 'icon';

const Icon: FunctionComponent<IconProps & SVGProps<SVGSVGElement>> = (props) => {
  const { name, ...otherProps } = props;

  const iconName = `#${iconPrefix}-${name}`;

  return (
    <svg className="icon" aria-hidden="true" {...otherProps}>
        <use xlinkHref={iconName}></use>
    </svg>
  )
}
export default Icon;