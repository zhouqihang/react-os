import React, { Component } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';
import DockerBar from './Systems/DockerBar';
import Popup from './components/Popup';
import Window from './Systems/Window'
import SystemMenu from './Systems/SystemMenu';
import defaultApps from './apps';

import App, { IApp } from './services/App';

import systemApps from './configs/systemApps';

interface IAppState {
  apps: App[];
  showPopup: boolean;
  launchdAppInstances: React.ReactNode[];
}

class AppComponent extends Component<any, IAppState> {
  protected s: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      apps: this.initApps(),
      showPopup: true,
      launchdAppInstances: []
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
    const { apps, launchdAppInstances } = this.s;
    return (
      <>
        <Desktop background="/desktops/1.jpg" id="os-desktop">
          {/* <defaultApps.TodoList>
          </defaultApps.TodoList> */}
          {
            launchdAppInstances
          }
        </Desktop>
        <StatusBar id="os-statusbar"></StatusBar>
        <DockerBar apps={apps} activeAppIds={[]} onClick={this.launchApp}></DockerBar>
      </>
    )
  }

  componentDidMount() {
  }

  initApps() {
    return systemApps.map(item => new App(item));
  }

  launchApp = (app: App) => {
    console.log('start app: ' + app.name);
    const ComponentClass = app.getComponent();
    // @ts-ignore
    const instance = <ComponentClass key={app.namespace} />
    this.s.launchdAppInstances = [instance];
  }
}

export default AppComponent;