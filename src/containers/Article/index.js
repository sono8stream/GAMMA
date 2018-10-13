import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import remark from 'remark';
import reactRenderer from 'remark-react';

import Message from '../../components/Message';
import ChatBox from '../../components/ChatBox';

import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const blogRef = firebaseDB.ref('blogs');
const processor=remark().use(reactRenderer);

class Articles extends Component {
  constructor(props){
    super(props);
    this.state={
      articles: [],
      text: "# hello GAMMA.",
    }
  }

  componentWillMount(){
    blogRef.on("child_added",(snapshot)=>{
      let val=snapshot.val();
      let newArticles=this.state.articles;
      newArticles.push({
        text: val.text,
        title: val.title,
      });
    })
  }

  onTextChange(e){
    this.setState({text: e.target.value});
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

        <div style={{height:50}} />
        <Input value={this.state.text} multiline="true"
          onChange={(e)=>this.onTextChange(e)}/>
        {processor.processSync(this.state.text).contents}
        {this.state.articles.map((a,i)=>{
            return (
              <div className="Message" key={i}>
                {a.title}
                {a.text}
              </div>
            );
          })}
      </div>
    );
  }  
}

export default Articles;
