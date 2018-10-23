import { connect } from 'react-redux';
import { increment, decrement, sendMessage } from '../actions';
import Counter from '../components/Counter';

const mapStateToProps = state => ({
    value: state.counter.value,
    sent: state.counter.sent
});

const mapDispatchToProps = dispatch => ({
    increment: value => dispatch(increment(value)),
    decrement: value => dispatch(decrement(value)),
    sendValue: value => dispatch(sendMessage(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);