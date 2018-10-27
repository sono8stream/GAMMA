import { connect } from 'react-redux';
import { fetchEvents } from './actions';
import EventList from './ListComponent';

const mapStateToProps = state => ({
    events: state.eventReducer,
});

const mapDispatchToProps = dispatch => ({
    fetch: fetchEvents(dispatch)//�����ŏ������s(���X�i�[�o�^)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);