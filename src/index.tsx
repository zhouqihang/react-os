import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './assets/styles/index.less';

window.$os = {
    request: null,
    uiKit: null,
    utils: null,
    version: process.env.version as string,
}

ReactDOM.render(<App></App>, document.getElementById('app'));