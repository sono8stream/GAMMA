import { firebaseDB } from '../firebase';

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
let sendSucceeded = false;

function send(value) {
    console.log("sending");
    messageRef.push({
        profile_image: "aiueo",
        text: value,
        user_name: "anonymous",
    }, error => sendSucceeded = !error);
    return true;
}
//ƒAƒ[ŠÖ”‚¾‚Æshadow name error
export const sendMessage = value => ({
    type: SEND_MESSAGE,
    sent: (() => {
        console.log("sending");
        messageRef.push({
            profile_image: "aiueo",
            text: value,
            user_name: "anonymous",
        }, error => sendSucceeded = !error);
        return true;
    })()
});