/**
 * @description 顶部菜单栏操作按钮
 * @author zhouqihang
 */
import React from 'react';
import { menuListType, appMenuBarMenus } from '../../services/MenuType';
import SystemMenu from '../../Systems/SystemMenu';

const prefix = 'os-appmenu';

interface IAppMenuProps {
    menus: appMenuBarMenus;
}

const AppMenu: React.FunctionComponent<IAppMenuProps> = function (props) {
    return (
        // <SystemMenu className={prefix} menus={props.menus} />
        <ul className={prefix}>
            {
                props.menus.map(item => {
                    return (
                        <SystemMenu menus={item.menus}>
                            <li key={item.id} className={prefix + '_item hover-bg'}>{item.content}</li>
                        </SystemMenu>
                    )
                })
            }
        </ul>
    )
}

export default AppMenu;