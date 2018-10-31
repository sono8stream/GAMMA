import { connect } from 'react-redux';
import { fetchEvents } from './actions';
import EventList from './ListComponent';

const mapStateToProps = state => ({
    events: state.eventReducer,
});

const mapDispatchToProps = dispatch => ({
    fetch: state=>fetchEvents(state,dispatch)//ここで処理実行(リスナー登録)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);