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

const messageRef = firebaseDB.ref('messages');
const processor=remark().use(reactRenderer);

class ArticleShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "# hello GAMMA.",
        }
    }

    onTextChange(e) {
        this.setState({ text: e.target.value });
    }

    render() {

        return (
            <div>
                <span>
                    <Input value={this.state.text} multiline="true"
                        onChange={(e) => this.onTextChange(e)} />
                </span>
                <span>
                    {processor.processSync(this.state.text).contents}
                </span>
            </div>
        );
    }
}

export default ArticleShow;
