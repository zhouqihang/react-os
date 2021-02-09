import React, { FunctionComponent } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';
import DockerBar from './Systems/DockerBar';

const App: FunctionComponent = (props) => {
    return (
        <>
            <Desktop background="/desktops/1.jpg">
            </Desktop>
            <StatusBar></StatusBar>
            <DockerBar apps={[]} activeAppIds={[]}></DockerBar>
        </>
    )
}

export default App;