/**
 * @description 顶部菜单栏操作按钮
 * @author zhouqihang
 */
import React from 'react';

const prefix = 'os-appmenu';

const AppMenu: React.FunctionComponent<{}> = function (props) {
    return (
        <ul className={prefix}>
            <li className={prefix + '_item hover-bg'}>文件</li>
            <li className={prefix + '_item hover-bg'}>编辑</li>
            <li className={prefix + '_item hover-bg'}>关于</li>
            <li className={prefix + '_item hover-bg'}>帮助</li>
        </ul>
    )
}

export default AppMenu;