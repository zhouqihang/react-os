import React, { Component } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';
import DockerBar from './Systems/DockerBar';
import Popup from './components/Popup';
import Window from './Systems/Window'
import SystemMenu from './Systems/SystemMenu';

import App, { IApp } from './services/App';

import systemApps from './configs/systemApps';

interface IAppState {
  apps: App[];
  showPopup: boolean;
}

class AppComponent extends Component<any, IAppState> {
  protected s: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      apps: this.initApps(),
      showPopup: true,
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
        <Desktop background="/desktops/1.jpg" id="os-desktop">
          <Popup visible={this.s.showPopup} style={{ left: 100, top: 200 }}>
            asdfasdf
          </Popup>
          <Window>
            <Window.Header>
            </Window.Header>
            <div>
              this is a window
            </div>
          </Window>
        </Desktop>
        <StatusBar id="os-statusbar"></StatusBar>
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