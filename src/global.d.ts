import { UIKit } from 'components/index';
declare global {
    interface Window {
        $os: {
            request: any;
            UIKit: UIKit;
            utils: any;
            version: string;
        }
    }
}

declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}
declare module "*.svg" {
    const content: any;
    export default content;
}