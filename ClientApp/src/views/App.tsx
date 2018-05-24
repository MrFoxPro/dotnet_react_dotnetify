import * as React from "react";
import LoginPage from "./LoginPage";
import AppLayout from "./AppLayout";
import auth from "../auth";
interface IState {
  authenticated: boolean;
};
interface IProps {
  children?: any;
};
export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { authenticated: auth.hasAccessToken() };
  }

  public render(): JSX.Element {
    const handleAuthenticated = () => this.setState({ authenticated: true });
    return !this.state.authenticated ? <LoginPage onAuthenticated={handleAuthenticated} /> : <AppLayout />;
  }
}
