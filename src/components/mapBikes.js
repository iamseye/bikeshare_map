import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import '../styles/mapBikes.scss'

class MapBikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      montrealCenter: { lat: 45.516136, lng: -73.656830},
      stations: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      selectedPlaceName: ''
    }
  }

  componentDidMount () {
    fetch(process.env.REACT_APP_API_PROXY + process.env.REACT_APP_GET_STATIONS_IFNO)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            stations: result.data.stations
          });
        },
        error => {
          console.log(error)
        }
      )
  }

  onMarkerClick = (props, marker, e) => {
    this.getStationStatus(props.id)
      .then(res => {
        this.setState({
          selectedPlace: res,
          activeMarker: marker,
          showingInfoWindow: true,
          selectedPlaceName: props.name
        })
      })
  }

  async getStationStatus(id) {
     const response =  await fetch(process.env.REACT_APP_API_PROXY + process.env.REACT_APP_GET_STATION_STATUS, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: parseInt(id) })
        })
      return await response.json()
    }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={this.state.montrealCenter}
      >
        { this.state.stations.map((item, i) => (
          <Marker key={i} id={item.station_id} position={{
             lat: item.lat,
             lng: item.lon
           }}
           onClick={this.onMarkerClick} name={item.name} />
         ))
        }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div className="MapBikes__infoWindow">
            <h2>{this.state.selectedPlaceName}</h2>
            <ul>
              <li>Available Bikes: <p>{this.state.selectedPlace.num_bikes_available}</p></li>
              <li>Free docks: <p>{this.state.selectedPlace.num_docks_available}</p></li>
            </ul>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapBikes)
