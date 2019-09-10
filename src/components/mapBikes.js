import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import '../styles/mapBikes.scss';


class MapBikes extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        initialCenter={{ lat: 47.444, lng: -122.176}}
      >
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapBikes);
