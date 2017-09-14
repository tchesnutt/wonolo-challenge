import React from 'react';
import AddressForm from './address_form';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='whole-page'>
        <AddressForm/>
      </div>
    );
  }
}

export default App;
