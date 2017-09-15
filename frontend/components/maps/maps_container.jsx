import { connect } from 'react-redux';
import Maps from './maps';

const mapStateToProps = (state, ownProps) => ({
  jobs: state.search_result.jobs,
  center: state.search_result.loc
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maps);
