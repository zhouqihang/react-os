import React, { FunctionComponent } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';

const App: FunctionComponent = (props) => {
    return (
        <>
            <Desktop background="/desktops/1.jpg">
            </Desktop>
            <StatusBar></StatusBar>
        </>
    )
}

export default App;