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
    this.displayBadges = this.displayBadges.bind(this)
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

  displayBadges(){
    if(this.state.selectedMarkerInfo.badges !== undefined){
      if(this.state.selectedMarkerInfo.badges.length > 0){
        return(
          <div>
            <h1>Badges:</h1>
            <div className="badges-list">
              {this.state.selectedMarkerInfo.badges.map((b, i) => (
                <div key={i}>
                  <p>{b.name}</p>
                  <img className='badge' src={b.icon_url}/>
                </div>
              ))}
            </div>
          </div>
        )
      }
    } else {
      return(
        <div/>
      )
    }
  }

  formatWage(wage,duration){

  }

  render(){
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
            position={{lat: j.latitude, lng: j.longitude}}
            icon={{ url: 'https://res.cloudinary.com/dxtvmwxxb/image/upload/v1505678573/wonolo-marker_zqeg7u.png',
                    anchor: new google.maps.Point(16,16),
                    scaledSize: new google.maps.Size(32,32)}}
                    />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div className='job-info'>
              <h1>Wage: </h1>
              <p>{this.state.selectedMarkerInfo.wage/(this.state.selectedMarkerInfo.duration/60)}/hr</p>
              <h1>Catgory: </h1>
              <p>{this.state.selectedMarkerInfo.category}</p>
              <h1>Description:</h1>
              <p>{this.state.selectedMarkerInfo.description}</p>
              {this.displayBadges()}
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
