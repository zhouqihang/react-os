export interface IApp {
  name: string;
  icon: string;
  namespace: string;
  component?: React.ComponentType;
}

let id = 0;

export default class App {
  public readonly name: string;
  public readonly icon: string;
  public readonly namespace: string;
  public readonly component?: React.ComponentType;

  protected id: number | null = null;

  constructor(app: IApp) {
    this.name = app.name;
    this.icon = app.icon;
    this.namespace = app.namespace;
    this.component = app.component;
  }

  public getComponent() {
    const Component = this.component;
    return this.component
  }
}