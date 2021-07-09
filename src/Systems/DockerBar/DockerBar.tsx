/**
 * @description 底部Docker栏
 * @author zhouqihang
 */
import React, { FunctionComponent, HTMLProps } from 'react';
import cn from 'classnames';
import DockerItem, { IDockerItemProps } from './DockerItem';
import App from '../../services/App';

export interface IDockerBarProps {
  className?: string;
  /** Docker栏固定APP列表 */
  apps: App[];
  /** 当前活跃App */
  activeAppIds: number[];
  onClick: (app: App) => void;
}

const prefix = 'os-docker'

const DockerBar: FunctionComponent<IDockerBarProps> = (props) => {
  const { apps, activeAppIds, className, onClick, ...otherProps } = props;

  return (
    <section className={`${prefix}-container`} id="os-docker">
      <div className={cn(prefix, className)} {...otherProps}>
        {
          apps.map(app => (
            <DockerItem name={app.name} namespace={app.namespace} icon={app.icon} key={app.namespace} onClick={() => onClick(app)} />
          ))
        }
      </div>
    </section>
  )
}

export default DockerBar;