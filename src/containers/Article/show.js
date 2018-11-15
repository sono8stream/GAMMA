import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { Divider } from '@material-ui/core';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../style/theme.css';
import { button } from '../../style/themeColor';

const blogRef = firebaseDB.ref('blogs');
const processor=remark().use(reactRenderer);

export default class ArticleShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      author: '',
      date: '',
      title: '',
      categories:['未分類'],
      text: '',
      error: '',
      onPreview: false,
    }

    this.ref = blogRef.child(props.match.params.id);
    this.ref.on('value', snapshot => {
      let val = snapshot.val();
      let categories = this.state.categories;
      if (val.categories) {
        Object.keys(val.categories).forEach(key => {
          categories.push(key);
        });
      }
      this.setState({
        author: val.author,
        date: val.date,
        title: val.title,
        categories: categories,
        text: val.text,
      });
      console.log(categories);
    });
  }

  render() {

    return (
      <div>
        <Header text='GAMMA Blog' />
        <Grid container spacing={16} justify='center'>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  {this.state.title}
                </Typography>
                <Typography variant='subtitle2' gutterBottom>
                  {`${this.state.date}   by ${this.state.author}`}
                </Typography>
                {this.state.categories.map((category) => (
                  <Chip
                    label={category}
                    clickable
                    variant='outlined'
                  />
                ))}
                <br />
                <br />
                <Divider light />
                <Typography variant='body2'>
                  {processor.processSync(this.state.text).contents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Footer />
      </div >
    );
  }
}