import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';

import Header from '../common/Header';
import '../style/theme.css';

export default class EventList extends Component {
    constructor(props) {
        super(props);
        document.body.className = "body";
        props.fetch("upcoming");
    }

    toShow(id) {
        this.props.history.push(`/events/upcoming/${id}`);
    }

    render() {
        if (!this.props.events) {
            return null;
        }
        console.log(this.props.events);

        return (
            <div>
                <Header text="GAMMA Event" />
                <Grid container spacing={16}>
                    {this.props.events.map((event, id) =>
                        <Grid item sm={4} xs={12} key={id}>
                            <Card>
                                <CardActionArea onClick={() => this.toShow(event.id)}>
                                    <CardContent>
                                        <Typography variant="h6" align="center">
                                            {event.title}
                                        </Typography>
                                        <Divider light />
                                        <br />
                                        <Typography variant="subtitle1" gutterBottom>
                                            <DateRangeIcon />{event.start} ~ {event.end}
                                            <br/>
                                            <PlaceIcon />{event.place}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}