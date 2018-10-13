import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Message extends Component{
    render(){
        return(
            <ListItem divider>
                <ListItemText
                  primary={this.props.message.text}
                  secondary={"@" + this.props.message.user_name} />
            </ListItem>
        )
    }
}