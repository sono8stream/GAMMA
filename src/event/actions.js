import { firebaseDB } from '../firebase';

export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_A_EVENT = "FETCH_A_EVENT";

export function fetchEvents(dispatch) {
    let ref = firebaseDB.ref('events');
    ref.on("value", snapshot => {
        dispatch({
            type: FETCH_EVENTS,
            events: snapshot.val()
        });
    });
}

export function fetchAEvent(eventId, dispatch) {
    let ref = firebaseDB.ref('events/' + eventId);
    console.log("fetch event" + eventId);
    ref.on("value", snapshot => {
        dispatch({
            type: FETCH_A_EVENT,
            event: snapshot.val(),
            id: eventId
        });
    })
}