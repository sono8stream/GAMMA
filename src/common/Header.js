import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import '../style/theme.css';

export default function Header(props) {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar variant="dense"
                    className="primary">
                    <Typography variant="h5" color="inherit">
                        {props.text}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: 60 }} />
        </div>
    );
}