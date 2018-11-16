﻿import React, { Component } from 'react';
import { firebaseAuth, firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Header from '../../common/Header';
import Footer from '../../common/Footer';
import '../../style/theme.css';
import { button } from '../../style/themeColor';
import { Divider } from '@material-ui/core';

const blogRef = firebaseDB.ref('blogs');
const processor = remark().use(reactRenderer);
const previewChars = 20;

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);

    this.accessibility = [
      '公開',
      '下書き',
      '限定公開',
    ]

    this.state = {
      onLoad: true,
      onCreate: true,
      accessibility: this.accessibility[1],
      author: '',
      date: '',
      title: '',
      text: '',
      preview:'',
      error: '',
      onPreview: false,
    }

    this.ref = blogRef.child(this.props.match.params.id);
  }

  componentWillMount() {
    window.scrollTo(0, 0);

    this.ref.once('value', snapshot => {
      let val = snapshot.val();
      if (!val) {
        this.setState({
          onLoad: false,
        });
      }
      else {
        if (this.state.author && val.author !== this.state.author) {
          this.toShow();
        }

        this.setState({
          onLoad: false,
          onCreate: false,
          accessibility: val.accessibility,
          author: val.author,
          date: val.date,
          title: val.title,
          text: val.text,
          preview: val.preview,
        });
      }
    });

    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ author: user.uid });
      }
      else {
        this.toShow();
      }
    });
  }

  toShow() {
    this.props.history.push(`/blogs/show/${this.props.match.params.id}`);
  }

  deleteArticle() {
    this.ref.set(null, error => {
      if (!error) {
        this.props.history.push('/blogs');
      }
    });
  }

  onAccessibilityChange(e) {
    this.setState({ accessibility: e.target.value });
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onTextChange(e) {
    this.setState({ text: e.target.value });
  }

  onPreviewChange(e) {
    let text = e.target.value;
    text = text.slice(0, previewChars - 1);
    this.setState({ preview: text });
  }

  switchPreview() {
    this.setState({ onPreview: !this.state.onPreview });
  }

  onSave() {
    let error = this.getValidationError();
    if (error) {
      console.log('onError');
      this.setState({ error: error });
    }
    else {
      this.setState({ error: '' });

      let preview = this.state.preview;
      if (!preview) {
        preview = this.state.text.slice(0, previewChars - 2);
        if (this.state.text.length > previewChars) {
          preview += '...';
        }
      }

      this.ref.update({
        accessibility: this.state.accessibility,
        author: this.state.author,
        date: this.getToday(),
        title: this.state.title,
        text: this.state.text,
        preview: preview,
      }, e => {
        if (e) {
          this.setState({ error: '保存に失敗しました' });
        }
        else {
          this.props.history.push(`/blogs/show/${this.props.match.params.id}`);
        }
      });
    }
  }

  getToday() {
    let today = new Date();
    let month = ('00' + today.getMonth()).slice(-2);
    let day = ('00' + today.getDate()).slice(-2);
    let text = `${today.getFullYear()}/${month}/${day}`;
    return text;
  }

  getValidationError() {
    if (!this.state.title.trim()) {
      return 'タイトルが入力されていません';
    }
    if (!this.state.text.trim()) {
      return '本文が入力されていません';
    }
    return null;
  }

  render() {
    if (this.state.onLoad) {
      return <Header text='GAMMA Blog' onLoad />
    }

    return (
      <div>
        <Header text='GAMMA Blog' />
        <Grid container spacing={16}>
          <Grid item>
            <Button color='primary' variant='outlined'
              onClick={() => this.toShow()} >
              編集をキャンセル
            </Button>
          </Grid>
          {(() => {
            if (!this.state.onCreate) {
              return (
                <Grid item>
                  <Button color='secondary' variant='outlined'
                    onClick={() => this.deleteArticle()} >
                    削除する
                  </Button>
                </Grid>
              );
            }
          })()}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      select
                      value={this.state.accessibility}
                      onChange={e => this.onAccessibilityChange(e)}
                      label='公開設定'
                      variant='outlined'>
                      {this.accessibility.map((option) => (
                        <MenuItem
                          value={option}
                          selected={option === this.state.accessibility}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="タイトル"
                      fullWidth
                      value={this.state.title}
                      onChange={(e) => this.onTitleChange(e)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="本文(マークダウン対応)"
                      multiline
                      fullWidth
                      value={this.state.text}
                      onChange={e => this.onTextChange(e)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="紹介文(20文字まで)"
                      helperText="未入力の場合、本文の一部が適用されます"
                      fullWidth
                      value={this.state.preview}
                      onChange={e => this.onPreviewChange(e)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button color='primary' variant='outlined'
                      onClick={() => this.switchPreview()} >
                      プレビューを見る
              </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button color='secondary' variant='outlined'
                      onClick={() => this.onSave()} >
                      変更を保存
                    </Button>
                    <Typography variant='body1' style={{ color: '#ff0000' }}>
                      {this.state.error}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.onPreview}
          onClose={() => this.switchPreview()}
        >
          <DialogContent>
            <DialogTitle>
              {this.state.title}
            </DialogTitle>
            <DialogContentText>
              {processor.processSync(this.state.text).contents}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.switchPreview()} color="primary">
              閉じる
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </div >
    );
  }
}