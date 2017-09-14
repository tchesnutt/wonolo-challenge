import { merge } from 'lodash';


const AddressRequestReducer = ( state = {}, action ) => {
  Object.freeze( state );
  switch ( action.type ) {
  case 'GET_ADDRESS':

  default:
    return state;
  }
};

export default AddressRequestReducer;
