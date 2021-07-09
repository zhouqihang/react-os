/**
 * @description Docker栏应用图标
 * @author zhouqihang
 */
import React, { FunctionComponent, HTMLProps } from 'react';
import cn from 'classnames';
import Icon from '../../components/Icon';
import { IApp } from '../../services/App';

export interface IDockerItemProps extends IApp {
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const prefix = 'os-docker-app'

const DockerItem: FunctionComponent<IDockerItemProps & HTMLProps<HTMLDivElement>> = (props) => {
  const { className, name, namespace, icon, active, onClick, ...otherProps } = props;
  const cns = cn(cn(prefix, { active }, className));
  return (
    <div className={cns} {...otherProps}>
      <div className={`${prefix}_icon`} onClick={onClick}>
        <Icon name={icon} fill="#000" />
      </div>
      <div className={`${prefix}_dot`}>
      </div>
    </div>
  )
}

export default DockerItem;