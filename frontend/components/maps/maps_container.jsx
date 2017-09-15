import { connect } from 'react-redux';
import Maps from './maps';

const mapStateToProps = (state, ownProps) => ({
  jobs: state.searchResult.jobs,
  center: state.searchResult.loc
})

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maps);
