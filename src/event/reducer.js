import { FETCH_EVENTS } from './actions';

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
                    })
                });
            }
            return [...events];
        default:
            return eventState;
    }
}