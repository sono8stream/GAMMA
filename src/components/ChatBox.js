import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent'; 

export default class ChatBox extends Component{
    render(){
        return(
            <div className="ChatBox">
            <Card className="Card"
              style={{bottom: 20,
              position: 'fixed',}}>
              <CardContent>
                <TextField
                  label="Name"
                  id="margin-none"
                  defaultValue=""
                  name="user_name"
                  onChange={this.props.onTextChange}
                />
                <TextField
                  label="Message"
                  id="margin-none"
                  defaultValue=""
                  name="text"
                  onChange={this.props.onTextChange}
                />
                        <Button variant="outlined" color= "primary"
                  onClick={this.props.onButtonClick}>送信</Button>
              </CardContent>
            </Card>
            <div className="margin" style={{height: 200}}>
            </div>
            </div>
        )
    }
}