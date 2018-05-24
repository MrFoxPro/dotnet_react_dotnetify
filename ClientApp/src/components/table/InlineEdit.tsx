import * as React from "react";
import EditIcon from "material-ui/svg-icons/content/create";
import TextField from "material-ui/TextField";
import { grey400 } from "material-ui/styles/colors";

interface IState {
  hover: any;
  edit: any;
  value: any;
};
interface IProps {
  onChange(value: any): void;
};

export default class InlineEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hover: false,
      edit: false,
      value: this.props.children
    };
  }
  public render() {
    const { hover, edit, value } = this.state;
    const originalValue = this.props.children;

    const styles = {
      label: { minHeight: "2em", marginTop: "10px" },
      editIcon: { width: 20, height: 20, fill: grey400, marginLeft: 8 },
      editIconHidden: { width: 20, height: 20, fill: "none", marginLeft: 8 }
    };

    const handleClick = (event: React.FormEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      if (!edit) {
        this.setState({ value: originalValue });
        this.setState({ edit: true, hover: false });
      }
    };

    const handleBlur = () => {
      this.setState({ edit: false });
      if (value.length > 0 && value !== originalValue) { this.props.onChange(value); }
      else { this.setState({ value: originalValue }); }
    };

    const handleMouseEnter = () => this.setState({ hover: true });
    const handleMouseLeave = () => this.setState({ hover: false });
    const setFocus = (input: TextField) => input.focus();

    if (!edit) {
      return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span onClick={handleClick}>{originalValue}</span>
          {hover ? <EditIcon style={styles.editIcon} /> : <EditIcon style={styles.editIconHidden} />}
        </div>
      );
    }
    else {
      return (
        <TextField
          id="EditField"
          ref={(input) => {
            if (input) {
              setFocus(input)
            }
          }}
          value={this.state.value}
          // onClick={handleClick}
          onBlur={handleBlur}
          onChange={event => {
            const target = event.target as HTMLInputElement;
            this.setState({ value: target.value });
          }}
        />
      );
    }
  }
}
