import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';

import Header from '../common/Header';
import '../style/theme.css';

export default class EventList extends Component {
    constructor(props) {
        super(props);
        document.body.className = "section";
    }

    render() {
        if (!this.props.events) {
            return null;
        }
        console.log(this.props.events);

        return (
            <div className>
                <Header text="GAMMA Event" />
                {this.props.events.map((event, id) =>
                    <Grid item xs={12} key={id} className="section">
                        <Card>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h5">
                                        {event.title}
                                    </Typography>
                                    <br />
                                    <Typography variant="subtitle1" gutterBottom>
                                        <DateRangeIcon />{event.date}
                                        <PlaceIcon />{event.place}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )}
            </div>
        );
    }
}