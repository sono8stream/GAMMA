import { connect } from 'react-redux';
import EventShow from './ShowComponent';

const mapStateToProps = (state, ownProps) => ({
    event: state.eventReducer.find(
        item => item.id === ownProps.match.params.id),
});

export default connect(mapStateToProps)(EventShow);