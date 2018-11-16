import React from 'react';
import { firebaseAuth } from '../firebase';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from '../common/Header';
import Footer from '../common/Footer';
import { button } from '../style/themeColor';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = { onLogout: false };
  }

  logout() {

    this.setState({ onLogout: true });

    firebaseAuth().signOut().then(() => {
      this.props.history.push('/blogs');
    });
  }

  render() {
    return (
      <div>
        <Header text='GAMMA Login' />
        <Grid container justify='center'>
          <Grid item>
            {(() => {
              if (this.state.onLogin) {
                return <CircularProgress color='secondary' />;
              }
              else {
                return (
                  <Button style={button.secondary}
                    onClick={() => this.logout()}>
                    ログアウトする
                </Button>
                );
              }
            })()}
          </Grid>
        </Grid>
        <Footer />
      </div>
    )
  }
}