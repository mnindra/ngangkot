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
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class Profil extends Component {

    render () {
        return (
          <Content>
              <Content style={styles.top}>
                  <TouchableOpacity
                    onPress={() => this.props.parent.props.navigation.navigate('UbahFoto', {image:this.props.image})}>
                      <Image style={styles.image} source={{uri: this.props.image}} />
                  </TouchableOpacity>

                  <Text style={styles.textTop}>{this.props.user.nama}</Text>
                  <Text style={styles.textTop}>{this.props.user.email}</Text>
              </Content>
              <Content style={styles.center}>
                  <List>
                      <ListItem icon first>
                        <Left>
                            <Icon name="place" style={styles.textCenter} />
                        </Left>
                          <Body>
                            <Text style={styles.textCenter}>{this.props.user.alamat}</Text>
                          </Body>
                      </ListItem>

                      <ListItem icon last>
                          <Left>
                              <Icon name="smartphone" style={styles.textCenter} />
                          </Left>
                          <Body>
                          <Text style={styles.textCenter}>{this.props.user.telp}</Text>
                          </Body>
                      </ListItem>
                  </List>
              </Content>
              <Content style={styles.bottom} padder>
                  <Grid>
                      <Col style={{paddingRight: 5}}>
                          <Button
                            primary
                            block
                            bordered
                            onPress={() => this.props.parent.props.navigation.navigate('UbahProfil', {user:this.props.user})}>
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