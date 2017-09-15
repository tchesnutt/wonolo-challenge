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
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClicked = this.onMarkerClicked.bind()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.jobs !== undefined){
      this.setState({
        markers: nextProps.jobs
      })
    }
  }

  onMarkerClicked(props, marker, e) {
     this.setState({
       selectedPlace: props,
       activeMarker: marker,
       showingInfoWindow: true
     });
   }

  render(){
    return(
      <Map
        style={{width: '500px', height: '500px'}}
        google={this.props.google}
        center={this.props.center}>
        {this.state.markers.map((j, idx) => (
          <Marker
            key={idx}
            onClick={this.onMarkerClicked}
            position={{lat: j.latitude, lng: j.longitude}}/>
        ))}

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA5SKon5QvsKHyq40iyglarbgAkJxUTUcc',
  version: '3.28'
})(Maps)
