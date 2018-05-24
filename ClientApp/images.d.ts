declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
interface NodeModule {
    hot: {
        accept(path?: string, callback?: () => void): void
    }
}

declare module "dotnetify" {
    export interface ITemplate {
        Target: string;
    }
    export interface IRouter {
        ssrState: (vmName: string) => any;
    }

    export interface IConnectOptions {
        getState?: () => any;
        setState?: (state: any) => void;
        vmArg?: any;
        headers?: any;
        exceptionHandler?: (exception: any) => void;
    }

    export class dotnetifyVM {
        constructor(iVMId: String, iReact: React.Component<any, any>, iOptions?: IConnectOptions);
        /**Send state to the back-end */
        $dispatch: (iValue: any) => void;
        $destroy: () => void;
        $routeTo: (route: any) => void;
        /**To set the target DOM element, implement the vm.onRouteEnter function in getInitialState. This API will pass the URL path and the route template object to the function whenever a route is 
        
      activated, and you will just set the Target property to the ID of the target DOM element. It also allows you to cancel the operation by returning false. */
        onRouteEnter: (path: string, template: ITemplate) => string;
    }

    class react {
        /**
         * @param iVMId Identifier (name) of ViewModel.
         * @param iReact React component to bind state
         * @param iOptions Advanced connection options
         * @returns ViewModel Connection
         */
        static connect(iVMId: String, iReact: React.Component<any, any>, iOptions?: IConnectOptions): dotnetifyVM;
        getViewModels(): dotnetifyVM[];
        router: IRouter;
    }
    export default class dotnetify {
        /**React binding */
        static react: react;
        /**Url of SignalR instance with port */
        static hubServerUrl: string;
        /**Hub options (Transport type, etc)*/
        static hubOptions: IHubOptions;
        /**Hub presentation */
        static Hub: Hub;
        /**Handler for receiving notifications */
        static connectionStateHandler: (state: any) => void;
    }
    export class Hub {
        /** Init Hub connection*/
        init(): void;
        /**Indicates that the reconnect attempt is limited to {value} times after every disconnected event. */
        reconnectRetry: Number;
        /**Initial and everytime delay */
        reconnectDelay: Array<Number>;
    }
    export interface IHubOptions {
        /**transport layers (webScokets, longPolling, etc) */
        transport: Array<string>;
    }
}
// Type definitions for dotnetify-react.router.
// Project: https://github.com/dsuryd/dotnetify
// Definitions by: brimce <https://github.com/Brimce>

declare module 'dotnetify/dist/dotnetify-react.router' {

    import { dotnetifyVM } from "dotnetify";

    export interface IRouteProps {
        vm: dotnetifyVM;
        route: string;
        className?: string;
        style?: string;
        onClick?: () => void;
    }

    export const RouteLink: React.SFC<IRouteProps>;

    export interface IRouteTargetProps {
        id: string;
        style?: React.CSSProperties;
    }

    export class RouteTarget extends React.PureComponent<IRouteTargetProps, any>{ }
}