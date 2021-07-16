import React, { Component, RefObject } from 'react';

import Desktop from './Systems/Desktop';
import StatusBar from './Systems/StatusBar';
import DockerBar from './Systems/DockerBar';
import Popup from './components/Popup';
import Window from './Systems/Window'
import SystemMenu from './Systems/SystemMenu';
import defaultApps from './apps';

import App, { IApp } from './services/App';
import { appMenuBarMenus } from './services/MenuType';

import systemApps from './configs/systemApps';

import { containElement } from './utils/contain';

interface IAppState {
  apps: App[];
  showPopup: boolean;
  launchdAppInstances: React.ReactElement[];
  currentActiveAppInstance?: React.ReactElement;
  currentMenuList: appMenuBarMenus;
}

class AppComponent extends Component<any, IAppState> {

  protected launchdAppMaps: Map<React.ReactElement, App> = new Map();
  protected launchdAppRefMaps: Map<React.ReactElement, any> = new Map();

  private systemMenu: appMenuBarMenus = [
    {
      id: '1',
      content: '文件',
      menus: [
        {
          id: '1-1',
          content: '新建',
          children: [
            {
              id: '1-1-1',
              content: '文件'
            },
            {
              id: '1-1-2',
              content: '文件夹'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      content: '编辑',
      menus: []
    },
    {
      id: '3',
      content: '显示',
      menus: []
    },
    {
      id: '4',
      content: '帮助',
      menus: []
    }
  ]

  constructor(props: any) {
    super(props);
    this.state = {
      apps: this.initApps(),
      showPopup: true,
      launchdAppInstances: [],
      currentActiveAppInstance: undefined,
      currentMenuList: this.systemMenu
    };
    const _this = this;
  }

  render() {
    const { apps, launchdAppInstances, currentActiveAppInstance, currentMenuList } = this.state;
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
        <StatusBar id="os-statusbar" menus={currentMenuList}></StatusBar>
        <DockerBar apps={apps} activeAppNamespace={this.getActivedAppInstances()} onClick={this.launchApp}></DockerBar>
      </>
    )
  }

  componentDidMount() {
    // 添加鼠标按下事件
    document.addEventListener('mousedown', this.documentMouseDownHandler);
  }

  componentWillUnmount() {
    // 组件销毁前移除事件
    document.removeEventListener('mousedown', this.documentMouseDownHandler);
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

    this.launchdAppMaps.set(instance, app);
    this.setState({
      launchdAppInstances: this.state.launchdAppInstances.concat(instance),
      currentActiveAppInstance: instance
    }, () => {
      // 触发生命周期
      const refObj = this.launchdAppRefMaps.get(instance);
      refObj.appActived();
      this.setState({
        currentMenuList: refObj.getAppMenu()
      });
    })
  }

  changeActiveInstance = (instance: React.ReactElement) => {
    if (instance === this.state.currentActiveAppInstance) {
      return;
    }

    const app = this.launchdAppMaps.get(instance) as App;
    this.setState({ currentActiveAppInstance: instance });
    console.log('app actived: ' + app.name);

    try {
      const refObj = this.launchdAppRefMaps.get(instance);
      refObj.appActived();
      this.setState({ currentMenuList: refObj.getAppMenu() });
    } catch (err) {
      // nothing
      console.error(err);
    }
  }

  getActivedAppInstances = () => {
    return this.state.launchdAppInstances.map(instance => {
      const app = this.launchdAppMaps.get(instance)
      if (!app) {
        return '';
      }
      return app.namespace;
    })
  }

  documentMouseDownHandler = (e: MouseEvent) => {
    // 切换应用菜单与系统菜单
    // 如果点击的不是一个具体的窗口(Window组件类型)则显示系统菜单
    if (
      !containElement(e.target as HTMLElement, function (node) {
        return ['window', 'statusbar'].includes(node.dataset.type || '');
      })
    ) {
      this.setState({
        currentActiveAppInstance: undefined,
        currentMenuList: this.systemMenu
      })
    }
  }
}

export default AppComponent;