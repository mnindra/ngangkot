import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Thumbnail,
} from 'native-base';
import {Alert} from 'react-native';
import firebase from '../config/firebase';

export default class Langganan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pengemudi: []
        }
    }

    renderRow(rowData) {
        return(
          <ListItem avatar style={{paddingBottom:10}}>
              <Left>
                  <Thumbnail square source={{ uri: 'http://placehold.it/300x300' }} />
              </Left>
              <Body>
              <Text>{rowData.nama}</Text>
              </Body>
          </ListItem>
        )
    }

    componentDidMount() {
        for (let index in this.props.user.langganan) {
            firebase.database().ref('pengemudi/' + index).once("value").then((snapshot) => {
                let array = this.state.pengemudi;
                array.push(snapshot.val());
                Alert.alert(JSON.stringify(snapshot.val()));
                this.setState({
                    pengemudi: array
                });
            });
        }
    }

    render () {
        return (
          <Content style={{ backgroundColor: '#fff' }} padder>
              <List dataArray={this.state.pengemudi} renderRow={(rowData) => this.renderRow(rowData)}>
              </List>
          </Content>
        )
    }

}