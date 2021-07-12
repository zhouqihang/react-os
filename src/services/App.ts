export interface IApp {
  name: string;
  icon: string;
  namespace: string;
  component: React.ComponentType;
}

let id = 0;

export default class App {
  public readonly name: string;
  public readonly icon: string;
  public readonly namespace: string;
  readonly component: React.ComponentType<any>;

  protected id: number | null = null;

  constructor(app: IApp) {
    this.name = app.name;
    this.icon = app.icon;
    this.namespace = app.namespace;
    this.component = app.component;
  }

  public getComponent(): React.ComponentType<any> {
    this.id = ++id;
    return this.component;
  }

  public getInstanceId() {
    return this.id as number;
  }
}