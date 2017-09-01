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

export default class Profil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            langganan: 0,
        }
    }

    langganan() {
        let navigationProps = this.props.navigation.state.params;
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref("penumpang/" + uid + "/langganan/" + navigationProps.pengemudi.id_pengemudi).set({
            id_pengemudi: navigationProps.pengemudi.id_pengemudi,
            status: 0
        });
        this.setState({
            langganan: 1
        });
    }

    batalLangganan() {
        let navigationProps = this.props.navigation.state.params;
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref("penumpang/" + uid + "/langganan/" + navigationProps.pengemudi.id_pengemudi).remove();
        this.setState({
            langganan: 0
        });
    }

    componentDidMount() {
        let navigationProps = this.props.navigation.state.params;
        for (let index in navigationProps.penumpang.langganan) {
            if (index == navigationProps.pengemudi.id_pengemudi) {
                this.setState({
                   langganan: 1
                });
            }
        }
    }

    render () {
        let placehold = 'http://placehold.it/300x300';
        let navigationProps = this.props.navigation.state.params;
        let langgananBtn = '';
        if(this.state.langganan == 0) {
            langgananBtn = <Button success block onPress={() => this.langganan()}><Text>Langganan</Text></Button>
        } else {
            langgananBtn = <Button danger block  onPress={() => this.batalLangganan()}><Text>Batal Langganan</Text></Button>
        }

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
                      <Title>Profil Pengemudi</Title>
                      </Body>
                  </Header>
                  <Content>
                      <Content style={styles.top}>
                          <Image style={styles.image} source={{uri: navigationProps.pengemudi.foto || placehold}} />
                          <Text style={styles.textTop}>{navigationProps.pengemudi.nama}</Text>
                          <Text style={styles.textTop}>{navigationProps.pengemudi.email}</Text>

                          {/*<Grid>*/}
                              {/*<Col style={{paddingRight: 5, textAlign: 'right'}}>*/}
                                  {/*<Button*/}
                                    {/*active*/}
                                    {/*IconLeft*/}
                                    {/*light*/}
                                    {/*transparent*/}
                                    {/*onPress={() => this.navigation.navigate('UbahProfil', {user:this.props.user})}>*/}
                                      {/*<Icon name="thumb-up" />*/}
                                      {/*<Text>25</Text>*/}
                                  {/*</Button>*/}
                              {/*</Col>*/}

                              {/*<Col style={{paddingLeft: 5}}>*/}
                                  {/*<Button*/}
                                    {/*IconLeft*/}
                                    {/*light*/}
                                    {/*transparent*/}
                                    {/*onPress={() => this.props.navigation.navigate('UbahPassword', {user:this.props.user})}>*/}
                                      {/*<Icon name="thumb-down" />*/}
                                      {/*<Text>5</Text>*/}
                                  {/*</Button>*/}
                              {/*</Col>*/}
                          {/*</Grid>*/}
                      </Content>
                      <Content style={styles.center}>
                          <List>
                              <ListItem icon first>
                                  <Left>
                                      <Icon name="place" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{navigationProps.pengemudi.alamat}</Text>
                                  </Body>
                              </ListItem>

                              <ListItem icon last>
                                  <Left>
                                      <Icon name="smartphone" style={styles.textCenter} />
                                  </Left>
                                  <Body>
                                  <Text style={styles.textCenter}>{navigationProps.pengemudi.telp}</Text>
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
                                    onPress={() => this.props.navigation.navigate('LihatAngkutan', {angkutan: navigationProps.pengemudi.angkutan})}>
                                      <Text>lihat angkutan</Text>
                                  </Button>
                              </Col>

                              <Col style={{paddingLeft: 5}}>
                                  <Button
                                    success
                                    block
                                    bordered>
                                      <Text>Lihat Testimoni</Text>
                                  </Button>
                              </Col>
                          </Grid>
                      </Content>
                  </Content>
                  {langgananBtn}
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