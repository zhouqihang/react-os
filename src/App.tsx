import React, { Component, RefObject } from 'react';

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
  launchdAppInstances: React.ReactElement[];
  currentActiveAppInstance?: React.ReactElement;
}

class AppComponent extends Component<any, IAppState> {
  protected s: IAppState;

  protected launchdAppMaps: Map<React.ReactElement, App> = new Map();
  protected launchdAppRefMaps: Map<React.ReactElement, any> = new Map();
  protected launchdAppIdMaps: Map<number, React.ReactElement> = new Map();

  constructor(props: any) {
    super(props);
    this.state = {
      apps: this.initApps(),
      showPopup: true,
      launchdAppInstances: [],
      currentActiveAppInstance: undefined
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
    const { apps, launchdAppInstances, currentActiveAppInstance } = this.s;
    return (
      <>
        <Desktop background="/desktops/1.jpg" id="os-desktop">
          {
            launchdAppInstances.map((instance, index) => {
              return React.cloneElement(instance, {
                zIndex: instance === currentActiveAppInstance ? launchdAppInstances.length * 100 : index * 100,
                ref: (node: any) => this.launchdAppRefMaps.set(instance, node)
              })
            })
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
    const id = app.getInstanceId();

    const instance = (<ComponentClass
      key={app.namespace + id}
      onWindowClick={() => this.changeActiveInstance(instance)}
      
    />);
    // ref={(node: any) => this.launchdAppRefMaps.set(instance, node)}

    console.log(instance)

    // TODO
    this.launchdAppMaps.set(instance, app);
    this.launchdAppIdMaps.set(id, instance);

    this.s.launchdAppInstances = this.s.launchdAppInstances.concat(instance);
    this.s.currentActiveAppInstance = instance;
  }

  changeActiveInstance = (instance: React.ReactElement) => {
    if (instance === this.s.currentActiveAppInstance) {
      return;
    }

    const app = this.launchdAppMaps.get(instance) as App;
    this.s.currentActiveAppInstance = instance;
    console.log('app actived: ' + app.name);

    try {
      // TODO 设置菜单
      const refObj = this.launchdAppRefMaps.get(instance);
      refObj.appActived();
    } catch (err) {
      // nothing
      console.error(err);
    }
  }
}

export default AppComponent;