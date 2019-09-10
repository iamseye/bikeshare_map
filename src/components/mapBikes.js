import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import '../styles/mapBikes.scss'


class MapBikes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      montrealCenter: { lat: 45.516136, lng: -73.656830},
      stations: []

    }
  }

  componentDidMount () {
    console.log(process.env.REACT_APP_GET_STATIONS_API)

    fetch(process.env.REACT_APP_GET_STATIONS_API)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            stations: result.data.stations
          });
        },
        (error) => {
          console.log(error)
        }
      )
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        initialCenter={this.state.montrealCenter}
      >
        { this.state.stations.map((item, i) => (
          <Marker key={i} id={item.station_id} position={{
             lat: item.lat,
             lng: item.lon
           }}
           onClick={() => console.log("You clicked me!")} />
         ))
       }
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API
})(MapBikes)
