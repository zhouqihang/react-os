/**
 * @description 顶部状态栏
 * @author zhouqihang
 */
import React, { PureComponent } from 'react';

import Time from './Time';
import AppMenu from './AppMenu';
import Icon from '../../components/Icon';

const prefix = 'os-statusbar';

class StatusBar extends PureComponent {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <section className={prefix}>
                <div className="system-menu hover-bg">
                    <Icon name="Apple" />
                </div>
                <div className="app-menu">
                    <AppMenu />
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