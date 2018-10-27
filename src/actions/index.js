import { firebaseDB } from '../firebase';
import Message from '../components/Message';

export const INCREMENT = 'INCREMENT';

export const increment = value => ({
    type: INCREMENT,
    value : value+1
});

export const DECREMENT = 'DECREMENT';

export const decrement = value => ({
    type: DECREMENT,
    value : value-1
});

export const SEND_MESSAGE = 'SEND_MESSAGE';

const messageRef = firebaseDB.ref('messages');
//let sendSucceeded = false;

export function sender(value,dispatch) {
    messageRef.push({
        profile_image: "aiueo",
        text: value,
        user_name: "anonymous",
    }, error => {
        if (!error) {
            let sendSucceed = true;
            console.log(sendSucceed);
            dispatch({
                type: SEND_MESSAGE,
                sent: sendSucceed
            });
        }
    });
}