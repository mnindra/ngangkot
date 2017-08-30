import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Thumbnail
} from 'native-base';

export default class Langganan extends Component {

    render () {
        return (
          <Content>
              <List>
                  <ListItem itemDivider>
                      <Text>A</Text>
                  </ListItem>
                  <ListItem avatar style={{paddingTop:10, paddingBottom: 10}}>
                      <Left>
                          <Thumbnail square source={{ uri: 'http://placehold.it/300x300' }} />
                      </Left>
                      <Body>
                      <Text>Aron Nelsom</Text>
                      </Body>
                  </ListItem>
                  <ListItem avatar style={{paddingTop:10, paddingBottom: 10}}>
                      <Left>
                          <Thumbnail square source={{ uri: 'http://placehold.it/300x300' }} />
                      </Left>
                      <Body>
                      <Text>Ali Connor</Text>
                      </Body>
                  </ListItem>

                  <ListItem itemDivider>
                      <Text>B</Text>
                  </ListItem>
                  <ListItem avatar style={{paddingTop:10, paddingBottom: 10}}>
                      <Left>
                          <Thumbnail square source={{ uri: 'http://placehold.it/300x300' }} />
                      </Left>
                      <Body>
                      <Text>Beny Nelson</Text>
                      </Body>
                  </ListItem>
              </List>
          </Content>
        )
    }

}