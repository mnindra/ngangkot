import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text,
  Card,
  H2,
  Icon,
  Grid,
  Col,
  StyleProvider,
  Header,
  Left,
  Body,
  Title
} from 'native-base';
import {View, Alert} from  'react-native';
import getTheme from '../../../native-base-theme/components/index';
import material from '../../../native-base-theme/variables/material';
import firebase from '../../config/firebase';
import styles from './styles';
import MapView from 'react-native-maps';

export default class RuteAngkot extends Component {

  constructor(props) {
    super(props);
    this.mapRef = null;
    this.navigationProps = this.props.navigation.state.params;

    this.state = {
      position: {
        latitude: this.navigationProps.position.latitude,
        longitude: this.navigationProps.position.longitude
      },
      loading: false,
      rute: [],
      ruteDekat: [],
      error: null
    };
  }

  componentDidMount() {
    // mencari lokasi geolocation
    this.watchId = navigator.geolocation.watchPosition((position) => {
        this.setState({
          loading: false,
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null
        });
        this.mapRef.fitToElements(true);
      }, (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    //  mengambil semua data rute
    firebase.database().ref("rute").once("value").then((snapshot) => {
      let rute = [];
      for (let index in snapshot.val()) {
        rute.push(snapshot.val()[index]);
      }
      this.setState({rute});

      // mencari rute terdekat dari titik tujuan
      let latTujuan = this.navigationProps.lokasiTujuan.latitude;
      let lonTujuan = this.navigationProps.lokasiTujuan.longitude;
      let ruteDekat = [];
      this.state.rute.forEach((item) => {
        let overview_path = item.rute.routes[0].overview_path;
        let dekat = false;

        for(let index in overview_path) {
          let latRute = overview_path[index].lat;
          let lonRute = overview_path[index].lng;
          let jarak = this.getDistanceFromLatLonInKm(latTujuan, lonTujuan, latRute, lonRute);
          if(jarak < 1) {
            dekat = true;
            break;
          }
        }

        if(dekat) {
          ruteDekat.push(item);
        }
      });

      // mencari rute terdekat dari titik awal
      let latAwal = this.navigationProps.lokasiAwal.latitude;
      let lonAwal = this.navigationProps.lokasiAwal.longitude;
      let ruteDekat2 = [];
      ruteDekat.forEach((item) => {
        let overview_path = item.rute.routes[0].overview_path;
        let dekat = false;

        for(let index in overview_path) {
          let latRute = overview_path[index].lat;
          let lonRute = overview_path[index].lng;
          let jarak = this.getDistanceFromLatLonInKm(latAwal, lonAwal, latRute, lonRute);
          if(jarak < 1) {
            dekat = true;
            break;
          }
        }

        if(dekat) {
          ruteDekat2.push(item);
        }
      });

      // simpan rute yang dekat ke state
      this.setState({
        ruteDekat: ruteDekat2
      });

      this.state.ruteDekat.forEach((item) => {
        Alert.alert(JSON.stringify(item.id_rute));
      });
    });
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  addMarker(coordinate) {
    let markers = [];
    markers.push({latlng: coordinate});
    this.setState({markers});
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>

        </Container>
      </StyleProvider>
    );
  }
}