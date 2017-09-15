import React from 'react';
import AddressForm from './address_form/address_form_container';
import Maps from './maps/maps_container';
import Modal from 'react-modal'

const customStyles = {
  content : {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '700px'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      welcome: true
    }

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
   this.setState({welcome: false});
 }

  render() {
    return (
      <div className='whole-page'>
        <Modal
          isOpen={this.state.welcome}
          onRequestClose={this.closeModal}
          contentLabel="Modal"
          style={customStyles}
          >
          <div className='modal-content'>
            <h1> Welcome To Wonolyagot!</h1>
            <p>So you've heard good things about Wonolo. You've done some reasearch and you're interested.
              <br/>
              You ask yourself, "What do they got for me?".
              <br/>
              Enter Wonolyagot!
              <br/>
              A simple tool for finding what opportunities await you upon signing up for Wonolo!
              <br/>
              Input your address and/or city with the distance you'd be willing to commute and hit 'Submit'. Red markers will appear around the map denoting a job in your area. Click on one to find out more!
            </p>
          </div>
        </Modal>
        <AddressForm/>
        <Maps/>
      </div>
    );
  }
}

export default App;
