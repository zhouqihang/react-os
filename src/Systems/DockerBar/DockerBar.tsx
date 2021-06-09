/**
 * @description 底部Docker栏
 * @author zhouqihang
 */
import React, { FunctionComponent, HTMLProps } from 'react';
import cn from 'classnames';
import DockerItem, { IDockerItemProps } from './DockerItem';
import { IApp } from '../../services/App';

export interface IDockerBarProps {
  /** Docker栏固定APP列表 */
  apps: IApp[];
  /** 当前活跃App */
  activeAppIds: number[];
}

const prefix = 'os-docker'

const DockerBar: FunctionComponent<IDockerBarProps & HTMLProps<HTMLDivElement>> = (props) => {
  const { apps, activeAppIds, className, ...otherProps } = props;

  return (
    <section className={`${prefix}-container`} id="os-docker">
      <div className={cn(prefix, className)} {...otherProps}>
        {
          apps.map(app => (
            <DockerItem name={app.name} namespace={app.namespace} icon={app.icon} key={app.namespace} />
          ))
        }
      </div>
    </section>
  )
}

export default DockerBar;