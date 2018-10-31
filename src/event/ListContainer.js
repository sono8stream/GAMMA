import { connect } from 'react-redux';
import { fetchEvents } from './actions';
import EventList from './ListComponent';

const mapStateToProps = state => ({
    events: state.eventReducer,
});

const mapDispatchToProps = dispatch => ({
    fetch: state=>fetchEvents(state,dispatch)//�����ŏ������s(���X�i�[�o�^)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);