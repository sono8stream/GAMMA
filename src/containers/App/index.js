import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';
import Message from '../../components/Message';
import ChatBox from '../../components/ChatBox';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Counter from '../counter';

const messageRef = firebaseDB.ref('messages');
const styles={
  palette: {
    primary: {
      main: '#0091ea',
    },
    secondary: {
      main: '#ffd740',
    },
  },
};

class App extends Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.state = {
            messages: [],
            profile_image: "",
            text: "",
            user_name: "",
        }
    }

    onTextChange(e) {
        if (e.target.name === 'user_name') {
            this.setState({
                "user_name": e.target.value,
            });
        }
        else if (e.target.name === 'profile_image') {
            this.setState({
                "profile_image": e.target.value,
            });
        }
        else if (e.target.name === 'text') {
            this.setState({
                "text": e.target.value,
            });
        }
    }

    onButtonClick() {
        if (this.state.user_name === "") {
            alert('user_name empty');
            return;
        }
        else if (this.state.text === "") {
            alert('text empty');
            return;
        }
        messageRef.push({
            profile_image: this.state.profile_image,
            text: this.state.text,
            user_name: this.state.user_name,
        })
    }

    componentWillMount() {
        messageRef.on('child_added', (snapshot) => {
            const m = snapshot.val();
            let msgs = this.state.messages;

            msgs.push({
                profile_image: m.profile_image,
                text: m.text,
                user_name: m.user_name,
            })

            this.setState({
                messages: msgs
            });
        })
    }

    render() {

        return (
            <div className="App">
                <AppBar position="fixed"
                    style={{ background: styles.palette.primary.main }}>
                    <Toolbar variant="dense">
                        <Typography variant="h5" color="inherit">
                            GAMMA mini TALK
            </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ height: 50 }} />
                <Counter />
                <List>
                    {this.state.messages.map((m, i) => {
                        return (
                            <div className="Message" key={i}>
                                <Message message={m} />
                            </div>
                        );
                    })}
                </List>
                <ChatBox onTextChange={this.onTextChange}
                    onButtonClick={this.onButtonClick}
                />
            </div>
        );
    }
}

export default App;
