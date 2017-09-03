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

export default class LokasiTujuan extends Component {

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
      markers: [],
      error: null
    };
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
    markers.push({latlng: coordinate});
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
            <Title>Lokasi Tujuan</Title>
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
              onMapReady={() => this.mapRef.fitToElements(true)}
              onPress={(event) => this.addMarker(event.nativeEvent.coordinate)}>

              {/* marker posisi */}
              <MapView.Marker
                coordinate={{latitude: this.state.position.latitude, longitude: this.state.position.longitude}}>
                <View style={styles.radius}>
                  <View style={styles.marker} />
                </View>
              </MapView.Marker>

              {/* marker titik tujuan */}
              {this.state.markers.map(marker => (
                <MapView.Marker
                  draggable
                  pinColor={"#447dd4"}
                  coordinate={marker.latlng}
                  title={'Lokasi Tujuan'}
                  description={'lokasi yang ingin anda tujuan'}
                />
              ))}

              {/* marker titik awal */}
              <MapView.Marker
                pinColor={"#71B300"}
                coordinate={this.navigationProps.lokasiAwal}
                title={'Lokasi Awal'}
                description={'lokasi dimana anda akan naik angkot'}
              />

            </MapView>
            <Text>{ this.state.loading ? 'mencari lokasi saat ini...' : '' }</Text>
            <Text style={styles.textHint}>Sentuh peta untuk menentukan lokasi tujuan</Text>
          </View>

          <Button
            success
            block
            onPress={() => this.props.navigation.navigate('RuteAngkot', {lokasiAwal: this.navigationProps.lokasiAwal, lokasiTujuan: this.state.markers[0].latlng, position: this.state.position})}>
          <Text>Selanjutnya</Text>
          </Button>
        </Container>
      </StyleProvider>
    );
  }
}