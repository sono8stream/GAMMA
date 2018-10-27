import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default class ChatBox extends Component{
    render(){
        return(
            <div className="ChatBox">
                <Grid container spacing={8}
                    style={{
                    bottom: 20,
                        position: 'fixed',
                    }}>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="Name"
                                    defaultValue=""
                                    name="user_name"
                                    onChange={this.props.onTextChange}
                                />
                                <TextField
                                    label="Message"
                                    defaultValue=""
                                    name="text"
                                    onChange={this.props.onTextChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            style={{
                                background: '#ffd740'
                            }}
                            onClick={this.props.onButtonClick}>
                            送信
                        </Button>
                    </Grid>
                </Grid>
            <div className="margin" style={{height: 200}}>
            </div>
            </div>
        )
    }
}