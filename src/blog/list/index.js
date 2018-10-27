import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class ArticleList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Typography variant="h4" color="inherit">
                            GAMMA Blog
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{ height: 80 }} />

                <Grid container spacing={16}>
                    {this.props.articles.map(a =>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography color="textSecondary" gutterBottom>
                                        {a.date}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {a.title}
                                    </Typography>
                                    <br />
                                    <Typography component="p">
                                        {a.preview}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default ArticleList;
