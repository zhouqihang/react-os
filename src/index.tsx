import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import components from './components';
import 'antd/dist/antd.css';
import './assets/styles/index.less';

window.$os = {
    request: null,
    UIKit: components,
    utils: null,
    version: process.env.version as string,
}

ReactDOM.render(<App></App>, document.getElementById('app'));