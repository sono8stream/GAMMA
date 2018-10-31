import { connect } from 'react-redux';
import { fetchAEvent } from './actions';
import EventShow from './ShowComponent';

const mapStateToProps = (state, ownProps) => {
    console.log("update!");
    let i = state.eventReducer.find(
        item => item.id === ownProps.match.params.id);
    console.log(i);
    return({
        event: state.eventReducer.find(
            item => item.id === ownProps.match.params.id),
        value: state.eventReducer.value,
});
};

const mapDispatchToProps = dispatch => ({
    fetch: (state, id) => fetchAEvent(state, id, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventShow);