import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../style/theme.css';

const blogRef = firebaseDB.ref('blogs');

class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loadCompleted: false,
    };
    //document.body.className = "body";
  }

  componentWillMount() {
    blogRef.on("child_added", (snapshot) => {
      let val = snapshot.val();
      let newArticles = this.state.articles;
      newArticles.push({
        id: snapshot.key,
        date: val.date,
        preview: val.preview,
        title: val.title,
      });
      this.setState({
        articles: newArticles,
        loadCompleted: true
      });
    })
  }

  createArticle() {
    let key = blogRef.push().key;
    this.props.history.push(`/blogs/edit/${key}`);
  }

  showArticle(id) {
    this.props.history.push(`/blogs/show/${id}`);
  }

  render() {
    if (!this.state.loadCompleted) {
      return <Header text="GAMMA Blog" onLoad />;
    }
    else {
      return (
        <div>
          <Header text="GAMMA Blog" />

          <Grid container spacing={16}>
            <Grid item>
            <Button color='secondary' variant='outlined'
              onClick={() => this.createArticle()} >
              新しく書く
            </Button>
            </Grid>
            {this.state.articles.map((a, i) =>
              <Grid item xs={12} key={i}>
                <Card>
                  <CardActionArea onClick={() => this.showArticle(a.id)}>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {a.date}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {a.title}
                      </Typography>
                      <Divider light />
                      <br />
                      <Typography component="p">
                        {a.preview}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )}
          </Grid>
          <Footer />
        </div>
      );
    }
  }
}

export default Articles;