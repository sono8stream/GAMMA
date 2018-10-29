import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';

import Header from '../common/Header';
import '../style/theme.css';

export default class EventShow extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
    }

    render() {
        if (!this.props.event) {
            return (
                <div>
                    <Header text="GAMMA Event" />
                    Page did not found.
                </div>
            );
        }
        console.log(this.props.event);
        let event = this.props.event;

        return (
            <div>
                <Header text="GAMMA Event" />
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            {event.title}
                        </Typography>
                        <Divider light />
                        <br />
                        <Typography variant="subtitle1" gutterBottom>
                            <DateRangeIcon />{event.date}
                            <PlaceIcon />{event.place}
                        </Typography>
                        <Divider light />
                        <br />
                        <Typography variant="body1">
                            {event.text}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}