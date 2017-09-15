import { connect } from 'react-redux';
import Maps from './maps';

const mapStateToProps = (state, ownProps) => ({
  jobs: state.jobs
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maps);
