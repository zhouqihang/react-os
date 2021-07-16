/**
 * @description 顶部状态栏
 * @author zhouqihang
 */
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import Time from './Time';
import AppMenu from './AppMenu';
import Icon from '../../components/Icon';
import { glassBackground } from '../../assets/styles/classNames';
import { appMenuBarMenus } from '../../services/MenuType';

const prefix = 'os-statusbar';

interface IStatusBarProps {
    menus: appMenuBarMenus;
}

class StatusBar extends PureComponent<React.HTMLAttributes<HTMLElement> & IStatusBarProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <section className={classnames(prefix, glassBackground)} {...this.props} data-type="statusbar">
                <div className="system-menu hover-bg">
                    <Icon name="Apple" />
                </div>
                <div className="app-menu">
                    <AppMenu menus={this.props.menus} />
                </div>
                <div className="app-status"></div>
                <div className="system-info">
                    <Time showDate showTime showWeek />
                </div>
            </section>
        )
    }
}

export default StatusBar;