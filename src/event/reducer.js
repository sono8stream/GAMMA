import { FETCH_EVENTS,FETCH_A_EVENT } from './actions';

export default function eventReducer(eventState = [], action) {
    switch (action.type) {
        case FETCH_EVENTS:
            let events = []
            if (action.events) {
                Object.keys(action.events).forEach(id => {
                    let event = action.events[id];
                    events.push({
                            title: event.title,
                            id: id,
                            date: event.date,
                            place: event.place,
                            text: event.text,
                        });
                });
            }
            console.log([...events]);
            return [...events];
        case FETCH_A_EVENT:
            let e = action.event;
            eventState.push({
                title: e.title,
                id: action.id,
                date: e.date,
                place: e.place,
                text: e.text,
            });
            console.log(eventState);
            return [...eventState];//...Ç…ÇµÇ»Ç¢Ç∆çXêVÇ≥ÇÍÇ»Ç©Ç¡ÇΩ
        default:
            return eventState;
    }
}