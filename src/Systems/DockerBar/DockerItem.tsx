/**
 * @description Docker栏应用图标
 * @author zhouqihang
 */
import React, { FunctionComponent, HTMLProps, ReactElement } from 'react';
import cn from 'classnames';
import Icon from '../../components/Icon';

export interface IDockerItemProps {
  name: string;
  appId: number;
  icon: string;
  active?: boolean;
}

const prefix = 'os-docker-app'

const DockerItem: FunctionComponent<IDockerItemProps & HTMLProps<HTMLDivElement>> = (props) => {
  const { className, name, appId, icon, active, ...otherProps } = props;
  const cns = cn(cn(prefix, { active }, className));
  return (
    <div className={cns} {...otherProps}>
      <div className={`${prefix}_icon`}>
        <Icon name={icon} fill="#000" />
      </div>
      <div className={`${prefix}_dot`}>
      </div>
    </div>
  )
}

export default DockerItem;