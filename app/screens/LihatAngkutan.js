import React, {Component} from 'react';
import {
    Container,
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Icon,
    Button,
    Grid,
    Col,
    Header,
    Title,
    StyleProvider,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import {StyleSheet, Image, View, Alert} from 'react-native';
import firebase from '../config/firebase';
import MapView from 'react-native-maps';

export default class LihatAngkutan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            overview_path: [],
            start: {},
            end: {},
            biaya: 0,
            keterangan: ''
        };
        this.placehold = 'http://placehold.it/300x300';
        this.navigationProps = this.props.navigation.state.params;
        this.mapRef = null;
    }

    componentDidMount() {
        // ambil overview_path untuk membuat polyline
        let id_rute = this.navigationProps.pengemudi.angkutan.id_rute;
        firebase.database().ref("rute/" + id_rute + "/rute/routes/0/overview_path").once("value").then((snapshot) => {
            let overview_path = [];
            for (let index in snapshot.val()) {
                overview_path.push({
                    latitude: snapshot.val()[index].lat,
                    longitude: snapshot.val()[index].lng
                });
            }

            this.setState({
                overview_path: overview_path,
                start: overview_path[0],
                end: overview_path[overview_path.length - 1],
            });
        });

        // ambil informasi tentang biaya, keterangan dll
        firebase.database().ref("rute/" + id_rute).once("value").then((snapshot) => {
            this.setState({
                biaya: snapshot.val().biaya,
                keterangan: snapshot.val().keterangan
            })
        });
    }

    render () {
        return (
          <StyleProvider style={getTheme(material)}>
              <Container>
                  <Header noShadow>
                      <Left>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="chevron-left" />
                          </Button>
                      </Left>
                      <Body>
                      <Title>Data Angkutan</Title>
                      </Body>
                  </Header>
                  <Content>
                      <Content style={styles.top}>
                          <Image style={styles.image} source={{uri: this.navigationProps.angkutan.foto || this.placehold}} />
                          <Text style={styles.textTop}>{this.navigationProps.angkutan.no_angkutan}</Text>
                      </Content>
                      <Content style={styles.center}>
                          <List>

                              <ListItem icon first>
                                  <Left>
                                      <Icon name="directions" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{this.navigationProps.angkutan.id_rute}</Text>
                                  </Body>
                              </ListItem>

                              <ListItem icon>
                                  <Left>
                                      <Icon name="place" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{this.state.keterangan}</Text>
                                  </Body>
                              </ListItem>

                              <ListItem icon last>
                                  <Left>
                                      <Text style={styles.textCenter}>Rp</Text>
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{this.state.biaya}</Text>
                                  </Body>
                              </ListItem>
                          </List>
                      </Content>
                      <Content style={styles.bottom} padder>

                          <MapView
                            ref={(ref) => this.mapRef = ref }
                            initialRegion={{
                                latitude: -7.958696250180737,
                                longitude: 122.64232739806175,
                                latitudeDelta: 0.11209798401417004,
                                longitudeDelta: 0.13812806457281113,
                            }}
                            onLayout={() => this.mapRef.fitToElements(true)}
                            style={{width: '100%', height: 300}}>

                              <MapView.Polyline
                                coordinates={this.state.overview_path}
                                strokeColor={'#709eff'}
                                strokeWidth={3}/>

                              <MapView.Marker
                                coordinate={this.state.start}
                                title={'A'}
                                description={'Titik Awal'}
                              />

                              <MapView.Marker
                                coordinate={this.state.end}
                                title={'B'}
                                description={'Titik Akhir'}
                              />

                          </MapView>
                      </Content>
                  </Content>
              </Container>
          </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: '#5677e7',
        paddingTop: 20,
        paddingBottom: 20,
    },
    center: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    bottom: {
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    image: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 10,
        width: 200,
        height: 200,
        borderRadius: 150
    },
    textTop: {
        textAlign: 'center',
        color: '#fff'
    },
    textCenter: {
        color: '#3d3d3d'
    },
});