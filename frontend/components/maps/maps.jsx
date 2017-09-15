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
      selectedMarkerInfo: {},
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClicked = this.onMarkerClicked.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.jobs !== undefined){
      this.setState({
        markers: nextProps.jobs
      })
    }
  }

  onMarkerClicked(props, marker, e) {
    let selectedMarkerInfo = this.state.markers.filter(el => {
      console.log(el.id);
      console.log(props.name);
      if(el.id === props.name){
        return el
      }
    })[0];
     this.setState({
       selectedPlace: props,
       selectedMarkerInfo: selectedMarkerInfo,
       activeMarker: marker,
       showingInfoWindow: true
     });
   }

  render(){
    console.log(this.state);
    return(
      <Map
        style={{width: '80%', height: '80%', marginLeft: '10%'}}
        google={this.props.google}
        center={this.props.center}
        zoom={10}>
        {this.state.markers.map((j) => (
          <Marker
            key={j.id}
            name={j.id}
            onClick={this.onMarkerClicked}
            position={{lat: j.latitude, lng: j.longitude}}/>
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedMarkerInfo.wage}</h1>
              <h4>Catgory:{this.state.selectedMarkerInfo.category}</h4>
              <h4>Description:</h4>
              <p>{this.state.selectedMarkerInfo.description}</p>
            </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA5SKon5QvsKHyq40iyglarbgAkJxUTUcc',
  version: '3.28'
})(Maps)
