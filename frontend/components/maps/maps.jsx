import React from 'react';
import {
  Map,
  Marker,
  InfoWindow,
  GoogleApiWrapper
} from 'google-maps-react';

class Maps extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markers: []
    }
  }

  render(){
    return(
      <Map google={this.props.google}>

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA5SKon5QvsKHyq40iyglarbgAkJxUTUcc'
})(Maps)
