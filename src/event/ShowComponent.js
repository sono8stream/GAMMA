import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PlaceIcon from '@material-ui/icons/Place';
import EditIcon from '@material-ui/icons/Edit';

import remark from 'remark';
import reactRenderer from 'remark-react';

import Header from '../common/Header';
import { button } from '../style/themeColor';

const processor = remark().use(reactRenderer);

export default class EventShow extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.state);
    console.log(props.match.params.id);
    if (!props.event) {
      props.fetch(props.match.params.state, props.match.params.id);
    }
    document.body.className = "body";
  }

  trimYear(date) {
    let year = new Date().getFullYear();
    let startYear = Number(date.split('-')[0]);
    if (year === startYear) {
      return date.replace(String(year) + '-', '');
    }
    return date;
  }

  trimEndDay(start, end) {
    let startParams = start.split(/-|\s/);
    let endParams = end.split(/-|\s/);
    if (startParams[0] === endParams[0]
      && startParams[1] === endParams[1]
      && startParams[2] === endParams[2]) {
      return endParams[3];
    }
    else {
      return end;
    }
  }

  render() {
    if (!this.props.event) {
      return (
        <div>
          <Header text="GAMMA Event" onLoad />
        </div>
      );
    }
    console.log(this.props.event);
    let event = this.props.event;
    event.end = this.trimEndDay(event.start, event.end);
    event.start = this.trimYear(event.start);
    event.end = this.trimYear(event.end);

    return (
      <div>
        <Header text="GAMMA Event" />
        <Card>
          <CardContent >
            <Typography variant="h5" align="center" gutterBottom>
              {event.title}
              <Button
                variant="fab" mini
                style={{
                  float: "right",
                  ...button.secondary
                }}
                onClick={() => true}>
                <EditIcon />
              </Button>
            </Typography>
            <Divider />
            <br />
            <Typography variant="subtitle1" gutterBottom>
              <DateRangeIcon />{event.start} ~ {event.end}
            </Typography>
            <br />
            <Typography variant="subtitle1" gutterBottom>
              <PlaceIcon />{event.place}
            </Typography>
            <br />
            <Typography variant="subtitle1" gutterBottom>
              <PlaceIcon />{Object.keys(event.participants).length}人
            </Typography>
            <Divider light />
            <br />
            {processor.processSync(event.text).contents}
          </CardContent>
        </Card>
      </div >
    );
  }
}