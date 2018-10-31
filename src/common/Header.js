import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import '../style/theme.css';
import colors from '../style/themeColor';

const styles = {
    colorPrimary: {
        backgroundColor: colors.secondaryLight,
    },
    barColorPrimary: {
        backgroundColor: colors.secondary,
    },
}

function Header(props) {
    let { classes } = props;
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar variant="dense"
                    className="primary">
                    <Typography variant="h5" color="inherit">
                        {props.text}
                    </Typography>
                </Toolbar>
                {(() => {
                    if (props.onLoad) {
                        return (
                            <LinearProgress
                                classes={{
                                    colorPrimary: classes.colorPrimary,
                                    barColorPrimary: classes.barColorPrimary,
                                }}
                            />);
                    }
                })()}
            </AppBar>
            <div style={{ height: 60 }} />
        </div>
    );
}

export default withStyles(styles)(Header);