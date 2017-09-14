import { connect } from 'react-redux';
import AddressForm from './address_form';
import { requestJobs } from '../../actions/job_actions';

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestJobs: (query) => dispatch(requestJobs(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);
