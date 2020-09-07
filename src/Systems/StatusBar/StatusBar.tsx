import React, { PureComponent } from 'react';

import Time from './Time';
import AppMenu from './AppMenu';

const prefix = 'os-statusbar';

class StatusBar extends PureComponent {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <section className={prefix}>
                <div className="system-menu"></div>
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