import { firebaseDB } from '../firebase';

export const FETCH_EVENTS = "FETCH_EVENTS";

export function fetchEvents(dispatch) {
    let ref = firebaseDB.ref('events');
    ref.on("value", snapshot => {
        dispatch({
            type: FETCH_EVENTS,
            events: snapshot.val()
        });
    });
}