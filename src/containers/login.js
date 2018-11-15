import React from 'react';
import { firebaseAuth, firebaseDB } from '../firebase';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Header from '../common/Header';
import Footer from '../common/Footer';
import { button } from '../style/themeColor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  login() {
    let provider = new firebaseAuth.GithubAuthProvider();
    firebaseAuth().signInWithPopup(provider).then(result => {
      if (result.credential != null) {
        let ref = firebaseDB.ref('accounts').child(result.user.uid);
        ref.update({
          email: result.user.email,
          token: result.credential.accessToken,
        }, error => {
          if (!error) {
            this.props.history.push('/blogs');
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Header text='GAMMA Login' />
        <Grid container justify='center'>
          <Grid item>
            <Button style={button.secondary}
              onClick={() => this.login()}>
              ログインする
          </Button>
          </Grid>
        </Grid>
        <Footer />
      </div>
    )
  }
}