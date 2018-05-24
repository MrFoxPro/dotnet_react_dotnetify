import * as React from "react";
import * as dotnetify from "dotnetify";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import TextField from "material-ui/TextField";
import { grey400, pink400 } from "material-ui/styles/colors";
import BasePage from "../components/BasePage";
import ThemeDefault from "../styles/theme-default";
import { IEmployeeInfo } from "../types/IEmployeeInfo";

interface IState {
  Id?: number,
  dirty: boolean,
  Employees: IEmployeeInfo[],
  FirstName: string,
  LastName: string
}
interface IProps { };
class FormPage extends React.Component<IProps, IState> {
  public vm: dotnetify.dotnetifyVM;
  public routeTo: (route: any) => any;
  public dispatch: (state: any) => any;
  constructor(props: IProps) {
    super(props);
    this.vm = dotnetify.react.connect("Form", this);
    this.dispatch = state => this.vm.$dispatch(state);
    this.routeTo = route => this.vm.$routeTo(route);

    this.state = {
      dirty: false,
      Employees: [],
      FirstName: "",
      LastName: ""
    };
  }

  public componentWillUnmount() {
    this.vm.$destroy();
  }

  public render() {
    const { dirty, Employees, Id, FirstName, LastName } = this.state;

    const styles = {
      selectLabel: { color: pink400 },
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: "right"
      },
      saveButton: { marginLeft: 5 }
    } as any;

    const handleSelectFieldChange = (event: any, idx: any, value: any) => {
      if (Employees) {
        const Route = Employees.find(i => i.Id === value).Route;
        if (Route) {
          this.routeTo(Route);
        }
      }

    }

    const handleCancel = () => {
      this.dispatch({ Cancel: Id });
      this.setState({ dirty: false });
    };

    const handleSave = () => {
      this.dispatch({ Save: { Id, FirstName, LastName } });
      this.setState({ dirty: false });
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <BasePage title="Form Page" navigation="Application / Form Page">
          <form>
            <SelectField value={Id} onChange={handleSelectFieldChange} floatingLabelText="Select to edit" floatingLabelStyle={styles.selectLabel}>
              {Employees.map(item => <MenuItem key={item.Id} value={item.Id} primaryText={item.Name} />)}
            </SelectField>

            <TextField
              hintText="Enter first name"
              floatingLabelText="First Name"
              fullWidth={true}
              value={FirstName}
              onChange={event => {
                const target = event.target as HTMLInputElement;
                this.setState({ FirstName: target.value, dirty: true });
              }}
            />

            <TextField
              hintText="Enter last name"
              floatingLabelText="Last Name"
              fullWidth={true}
              value={LastName}
              onChange={event => {
                const target = event.target as HTMLInputElement;
                this.setState({ LastName: target.value });
              }}
            />

            <div style={styles.buttons}>
              <RaisedButton label="Cancel" onClick={handleCancel} disabled={!dirty} />

              <RaisedButton label="Save" onClick={handleSave} disabled={!dirty} style={styles.saveButton} primary={true} />
            </div>
          </form>
        </BasePage>
      </MuiThemeProvider>
    );
  }
}

export default FormPage;
