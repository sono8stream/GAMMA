import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';

import '../style/theme.css';

export default class EventShow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.events) {
            return null;
        }
        console.log(this.props.events);

        return (
            <div className>
                <Header text="GAMMA Event" />
                <Grid item xs={12} className="section">
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5">
                                    {event.title}
                                </Typography>
                                <Divider light/>
                                <br />
                                <Typography variant="subtitle1" gutterBottom>
                                    <DateRangeIcon />{event.date}
                                    <PlaceIcon />{event.place}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </div>
        );
    }
}