/**
 * @description 底部Docker栏
 * @author zhouqihang
 */
import React, { FunctionComponent, HTMLProps } from 'react';
import cn from 'classnames';
import DockerItem, { IDockerItemProps } from './DockerItem';

export interface IDockerBarProps {
  /** Docker栏固定APP列表 */
  apps: IDockerItemProps[];
  /** 当前活跃App */
  activeAppIds: number[];
}

const prefix = 'os-docker'

const DockerBar: FunctionComponent<IDockerBarProps & HTMLProps<HTMLDivElement>> = (props) => {
  const { apps, activeAppIds, className, ...otherProps } = props;

  return (
    <section className={`${prefix}-container`}>
      <div className={cn(prefix, className)} {...otherProps}>
        <DockerItem name="启动台" appId={1} icon="icons-launchpad" />
        <DockerItem name="启动台" appId={1} icon="icons-launchpad" active />
      </div>
    </section>
  )
}

export default DockerBar;