/**
 * @description 状态栏时间组件
 * @author zhouqihang
 */
import React, { FunctionComponent, memo, HTMLProps } from 'react';
import moment from 'moment';
import classnames from 'classnames';

import useTime from './hooks/useTime';
import { useMouseHover } from '../../hooks/useMouseHooks';

interface ITimeProps {
    showTime: boolean;
    showDate: boolean;
    showWeek: boolean;
}

const prefix = 'os-timer';
const weekMap: Record<string, string> = {
    '1': '星期一',
    '2': '星期二',
    '3': '星期三',
    '4': '星期四',
    '5': '星期五',
    '6': '星期六',
    '0': '星期日',
}

const Time: FunctionComponent<ITimeProps & HTMLProps<HTMLDivElement>> = (props) => {
    const { showTime, showDate, showWeek, className, ...otherProps } = props;

    let time = new Date();
    if (showTime) {
        time = useTime();
    }

    let mt = moment(time);
    const dateStr = mt.format('yyyy年MM月DD日');
    const weekStr = mt.format('d');
    const timeStr = moment(time).format('HH:mm:ss');

    const { isHover, setHover, onMouseEnter, onMouseLeave } = useMouseHover<HTMLDivElement>(false);
    const classNames = isHover ? `hover-bg` : '';
    return (
        <div className={classnames(prefix, classNames)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...otherProps}>
            {showDate && <span>{dateStr}</span>}
            {showWeek && <span>{weekMap[weekStr]}</span>}
            {showTime && <span>{timeStr}</span>}
        </div>
    )
}

export default memo(Time);