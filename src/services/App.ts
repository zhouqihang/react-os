export interface IApp {
  name: string;
  icon: string;
  namespace: string
}

let id = 0;

export default class App implements IApp {
  public name: string;
  public icon: string;
  public namespace: string;

  protected id: number | null = null;

  constructor(app: IApp) {
    this.name = app.name;
    this.icon = app.icon;
    this.namespace = app.namespace;
  }

  public launch() {
    
  }
}