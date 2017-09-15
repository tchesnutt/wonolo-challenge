import React from 'react';
import AddressForm from './address_form/address_form_container';
import Maps from './maps/maps_container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='whole-page'>
        <AddressForm/>
        <Maps/>
      </div>
    );
  }
}

export default App;
