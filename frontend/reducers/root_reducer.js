import { combineReducers } from 'redux';
import AddressRequestReducer from './address_request_reducer';

const RootReducer = combineReducers({
  addressRequest: AddressRequestReducer
});

export default RootReducer;
