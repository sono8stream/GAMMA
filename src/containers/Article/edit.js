import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Button from '@material-ui/core/Button';
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
const processor=remark().use(reactRenderer);

export default class ArticleEdit extends Component {
  constructor(props) {
    super(props);

    this.accessibility = [
      '公開',
      '下書き',
      '限定公開',
    ]

    this.state = {
      accessibility: this.accessibility[1],
      author: '',
      date: '',
      title: '',
      text: '',
      error: '',
      onPreview: false,
    }

    this.ref = blogRef.child(props.match.params.id);
    this.ref.once('value', snapshot => {
      let val = snapshot.val();
      this.setState({
        accessibility: val.accessibility
          ? val.accessibility : this.accessibility[1],
        author: val.author,
        date: val.date,
        title: val.title,
        text: val.text,
      });
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
      this.ref.update({
        accessibility: this.state.accessibility,
        title: this.state.title,
        text: this.state.text,
      });
      this.setState({ error: '保存に成功しました' });
    }
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

    return (
      <div>
        <Header text='GAMMA Blog' />
        <Grid container spacing={16} justify='center'>
          <Grid item xs={12} sm={8}>
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
          <Grid item xs={12} sm={8}>
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
            <Button color='secondary'              variant='outlined'
              onClick={() => this.switchPreview()} >
              プレビューを見る
              </Button>
          </Grid>
          <Grid item xs={12}>
            <Button style={button.secondary}
              onClick={() => this.onSave()} >
              変更を保存
            </Button>
            <Typography variant='body1' style={{ color: '#ff0000' }}>
              {this.state.error}
            </Typography>
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