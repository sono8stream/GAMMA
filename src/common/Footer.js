import React from 'react';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import '../style/theme.css';
import colors from '../style/themeColor';

function Footer(props) {
  return (
    <div
      style={{
        margin: '0 -200%',
        padding: '0 -200%',
        background: colors.primaryLight,
        textAlign: 'center'
      }}>
      <div style={{ height: 20 }} />
      <Divider light />
      <br />
      <Typography variant='body2' color='inherit' align='center'>
        contact : &nbsp;&nbsp;
        <a href='mailto:student@kawaz.org'>E-Mail</a>
        &nbsp;&nbsp;
        <a href='https://twitter.com/kawaz_student' target="_blank">
          Twitter
        </a>
        <br />
        Copyright © 2018 Kawaz Students. All rights reserved.
      </Typography>
    </div>
  );
}

export default Footer;