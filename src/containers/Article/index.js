import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const blogRef = firebaseDB.ref('blogs');

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        }
    }

    componentWillMount() {
        blogRef.on("child_added", (snapshot) => {
            let val = snapshot.val();
            let newArticles = this.state.articles;
            newArticles.push({
                date: val.date,
                preview: val.preview,
                title: val.title,
            });
            this.setState({ articles: newArticles });
        })
    }

    render() {

        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Typography variant="title" color="inherit">
                            GAMMA Blog
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{ height: 80 }} />

                <Grid container spacing={16}>
                {this.state.articles.map((a, i) => {
                        return (
                            <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {a.date}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {a.title}
                                        </Typography>
                                        <br/>
                                <Typography component="p">
                                    {a.preview}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    );
                })}
                </Grid>
            </div>
        );
    }
}

export default Articles;
