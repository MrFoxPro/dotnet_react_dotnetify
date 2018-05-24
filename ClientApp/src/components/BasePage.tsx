import * as React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles/styles';

interface IProps {
  title: string,
  navigation: any,
  children: any
}
const BasePage = (props: IProps) => {

  const { title, navigation } = props;

  return (
    <div>
      <span style={globalStyles.navigation}>{navigation}</span>
      <Paper style={globalStyles.paper}>
        <h3 style={globalStyles.title}>{title}</h3>
        <Divider />
        {props.children}
        <div style={globalStyles.clear} />
      </Paper>
    </div>
  );
};

export default BasePage;
