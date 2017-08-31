import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Icon,
    Button,
    Grid,
    Col
} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import firebase from '../config/firebase';

export default class Profil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nama: '',
            email: '',
            alamat: '',
            telp: '',
            foto: 'http://placehold.it/300x300',
        }
    }

    render () {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('penumpang/' + user.uid).once('value').then((snapshot) => {
                let user = snapshot.val();
                this.setState({
                    nama: user.nama,
                    email: user.email,
                    alamat: user.alamat,
                    telp: user.telp,
                });
            });

            firebase.storage().ref('penumpang/' + user.uid + '.jpg').getDownloadURL().then((url) => {
                this.setState({
                    foto: url
                });
            }).catch((error) => {
                this.setState({
                    foto: 'http://placehold.it/300x300'
                });
            });
        })

        return (
          <Content>
              <Content style={styles.top}>
                  <Image style={styles.image} source={{uri: this.state.foto}} />
                  <Text style={styles.textTop}>{this.state.nama}</Text>
                  <Text style={styles.textTop}>{this.state.email}</Text>
              </Content>
              <Content style={styles.center}>
                  <List>
                      <ListItem icon first>
                        <Left>
                            <Icon name="place" style={styles.textCenter} />
                        </Left>
                          <Body>
                            <Text style={styles.textCenter}>{this.state.alamat}</Text>
                          </Body>
                      </ListItem>

                      <ListItem icon last>
                          <Left>
                              <Icon name="smartphone" style={styles.textCenter} />
                          </Left>
                          <Body>
                          <Text style={styles.textCenter}>{this.state.telp}</Text>
                          </Body>
                      </ListItem>
                  </List>
              </Content>
              <Content style={styles.bottom} padder>
                  <Grid>
                      <Col style={{paddingRight: 5}}>
                          <Button primary block bordered>
                              <Text>Ubah Profil</Text>
                          </Button>
                      </Col>

                      <Col style={{paddingLeft: 5}}>
                          <Button danger block bordered>
                              <Text>Ubah Password</Text>
                          </Button>
                      </Col>
                  </Grid>
              </Content>
          </Content>
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
        height: 200
    },
    textTop: {
        textAlign: 'center',
        color: '#fff'
    },
    textCenter: {
        color: '#3d3d3d'
    },
});