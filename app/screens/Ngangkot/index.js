import React, {Component} from 'react';
import {
  Content,
  Text,
  Button
} from 'native-base';
import styles from './styles';

export default class Peta extends Component {

  constructor(props) {
    super(props);
    this.navigation = this.props.parent.props.navigation;
}

  render () {
    return (
      <Content padder style={styles.content}>
        <Text>Ngangkot</Text>
        <Button onPress={() => this.navigation.navigate('LokasiAwal')}><Text>Mulai Ngangkot</Text></Button>
      </Content>
    )
  }

}