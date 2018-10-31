import { FETCH_EVENTS,FETCH_A_EVENT } from './actions';

export default function eventReducer(eventState = [], action) {
    switch (action.type) {
        case FETCH_EVENTS:
            let events = []
            if (action.events) {
                Object.keys(action.events).forEach(id => {
                    let event = action.events[id];
                    events.push({
                        id: id,
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        place: event.place,
                        participants: event.participants,
                        text: event.text,
                    });
                });
            }
            console.log([...events]);
            return [...events];
        case FETCH_A_EVENT:
            let e = action.event;
            eventState.push({
                id: action.id,
                title: e.title,
                start: e.start,
                end: e.end,
                place: e.place,
                participants: e.participants,
                text: e.text,
            });
            console.log(eventState);
            return [...eventState];//...‚É‚µ‚È‚¢‚ÆXV‚³‚ê‚È‚©‚Á‚½
        default:
            return eventState;
    }
}