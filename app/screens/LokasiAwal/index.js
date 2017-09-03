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

export default class LokasiAwal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: 0,
        longitude: 0
      },
      loading: true,
      markers: [],
      error: null
    };
    this.mapRef = null;
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  addMarker(coordinate) {
    let markers = [];
    let id = Math.random().toString(36).substring(7);
    markers.push({key: id, latlng: coordinate});
    this.setState({markers});
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-left" />
              </Button>
            </Left>
            <Body>
            <Title>Lokasi Awal</Title>
            </Body>
          </Header>

          <View style={styles.mapContainer}>
            <MapView
              ref={(ref) => this.mapRef = ref }
              initialRegion={{
                latitude: -7.958696250180737,
                longitude: 122.64232739806175,
                latitudeDelta: 0.11209798401417004,
                longitudeDelta: 0.13812806457281113,
              }}
              style={styles.map}
              onPress={(event) => this.addMarker(event.nativeEvent.coordinate)}>

              {/* marker posisi */}
              <MapView.Marker
                coordinate={{latitude: this.state.position.latitude, longitude: this.state.position.longitude}}>
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
              </MapView.Marker>

              {/* marker titik awal */}
              {this.state.markers.map(marker => (
                <MapView.Marker
                  draggable
                  pinColor={"#3cb338"}
                  coordinate={marker.latlng}
                  title={'Lokasi Awal'}
                  description={'lokasi dimana anda akan naik angkot'}
                  onDragEnd={(event) => this.addMarker(event.nativeEvent.coordinate)}
                />
              ))}

            </MapView>
            <Text>{ this.state.loading ? 'mencari lokasi saat ini...' : '' }</Text>
            <Text style={styles.textHint}>Sentuh peta untuk menentukan lokasi awal</Text>
          </View>

          <Button
            success
            block
            onPress={() => this.props.navigation.navigate('LokasiTujuan', {lokasiAwal: this.state.markers[0].latlng, position: this.state.position})}>
            <Text>Selanjutnya</Text>
          </Button>
        </Container>
      </StyleProvider>
    );
  }
}