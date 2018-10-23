import { INCREMENT, DECREMENT,SEND_MESSAGE } from '../actions';

const counter = (counterState = { value: 0, sent: false }, action) => {
    switch (action.type) {
        case INCREMENT:
            return { value: action.value, sent: false };
        case DECREMENT:
            return { value: action.value, sent: false };
        case SEND_MESSAGE:
            return { value: 0, sent: action.sent };
        default:
            return counterState;
    }
}

export default counter;