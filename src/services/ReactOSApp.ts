import { appMenuBarMenus } from '../services/MenuType';
export default abstract class ReactOSApp {
  abstract instanceId: number;

  // abstract beforeAppLaunch(): any;
  // abstract afterAppLaunch(): any;
  abstract appActived(): void;
  // abstract appSleeped(): any;
  abstract getAppMenu(): appMenuBarMenus;
  // abstract appMenuHandler(): any;
}