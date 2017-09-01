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
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import firebase from '../config/firebase';

export default class LihatAngkutan extends Component {

    render () {
        let placehold = 'http://placehold.it/300x300';
        let navigationProps = this.props.navigation.state.params;

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
                          <Image style={styles.image} source={{uri: navigationProps.angkutan.foto || placehold}} />
                      </Content>
                      <Content style={styles.center}>
                          <List>
                              <ListItem icon first>
                                  <Left>
                                      <Icon name="directions-car" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{navigationProps.angkutan.no_angkutan}</Text>
                                  </Body>
                              </ListItem>

                              <ListItem icon last>
                                  <Left>
                                      <Icon name="directions" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{navigationProps.angkutan.id_rute}</Text>
                                  </Body>
                              </ListItem>
                          </List>
                      </Content>
                      <Content style={styles.bottom} padder>

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