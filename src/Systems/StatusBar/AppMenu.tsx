import React from 'react';

const prefix = 'os-appmenu';

const AppMenu: React.SFC<{}> = function (props) {
    return (
        <div className={prefix}>
            <div className={prefix + '_item hover-bg'}>文件</div>
            <div className={prefix + '_item hover-bg'}>编辑</div>
            <div className={prefix + '_item hover-bg'}>关于</div>
            <div className={prefix + '_item hover-bg'}>帮助</div>
        </div>
    )
}

export default AppMenu;