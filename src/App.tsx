import React, { Component } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';
import DockerBar from './Systems/DockerBar';

import App, { IApp } from './services/App';

import systemApps from './configs/systemApps';

interface IAppState {
  apps: App[];
}

class AppComponent extends Component<any, IAppState> {
  protected s: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      apps: this.initApps(),
    };
    const _this = this;

    this.s = new Proxy<IAppState>(this.state, {
      get: function (target, property, receiver) {
        return Reflect.get(target, property, receiver);
      },
      set: function (target, property, value) {
        Reflect.set(target, property, value);
        // @ts-ignore
        _this.setState({ [property]: value });
        return true;
      }
    });
  }

  render() {
    const { apps } = this.s;
    return (
      <>
        <Desktop background="/desktops/1.jpg">
        </Desktop>
        <StatusBar></StatusBar>
        <DockerBar apps={apps} activeAppIds={[]}></DockerBar>
      </>
    )
  }

  componentDidMount() {

  }

  initApps() {
    return systemApps.map(item => new App(item));
  }
}

export default AppComponent;