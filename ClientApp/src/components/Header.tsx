import * as React from "react";
import AppBar from "material-ui/AppBar";
import Menu from "material-ui/svg-icons/navigation/menu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { white } from "material-ui/styles/colors";
import auth from "../auth";

interface IProps {
  styles: any;
  handleChangeRequestNavDrawer?: void;
  onSidebarToggle(event: any): void;
};
const Header = (props: IProps) => {
  const { styles, onSidebarToggle }: IProps = props;

  const style = {
    appBar: {
      position: "fixed",
      top: 0,
      overflow: "hidden",
      maxHeight: 57
    },
    menuButton: { marginLeft: 10 },
    iconsRightContainer: { marginLeft: 20 }
  } as any;

  const handleSignout = () => auth.signOut();

  return (
    <div>
      <AppBar
        style={{ ...styles, ...style.appBar }}
        iconElementLeft={
          <IconButton style={style.menuButton} onClick={onSidebarToggle}>
            <Menu color={white} />
          </IconButton>
        }
        iconElementRight={
          <div style={style.iconsRightContainer}>
            <IconMenu
              iconButtonElement={
                <IconButton>
                  <MoreVertIcon color={white} />
                </IconButton>
              }
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem primaryText="Sign out" onClick={handleSignout} />
            </IconMenu>
          </div>
        }
      />
    </div>
  );
};

export default Header;
