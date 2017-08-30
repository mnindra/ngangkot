import React, {Component} from 'react';
import {
    Content,
    Text,
    List,
    ListItem,
    Body,
    Thumbnail,
    Right
} from 'native-base';

export default class Pesan extends Component {

    render () {
        return (
          <Content>
              <List>
                  <ListItem>
                      <Thumbnail square size={80} source={{ uri: 'http://placehold.it/300x300' }} />
                      <Body>
                      <Text>Sankhadeep</Text>
                      <Text note>Its time to build a difference . .</Text>
                      </Body>
                      <Right>
                          <Text note>3:43 pm</Text>
                      </Right>
                  </ListItem>

                  <ListItem>
                      <Thumbnail square size={80} source={{ uri: 'http://placehold.it/300x300' }} />
                      <Body>
                      <Text>Sankhadeep</Text>
                      <Text note>Its time to build a difference . .</Text>
                      </Body>
                      <Right>
                          <Text note>3:43 pm</Text>
                      </Right>
                  </ListItem>

                  <ListItem>
                      <Thumbnail square size={80} source={{ uri: 'http://placehold.it/300x300' }} />
                      <Body>
                      <Text>Sankhadeep</Text>
                      <Text note>Its time to build a difference . .</Text>
                      </Body>
                      <Right>
                          <Text note>3:43 pm</Text>
                      </Right>
                  </ListItem>

                  <ListItem>
                      <Thumbnail square size={80} source={{ uri: 'http://placehold.it/300x300' }} />
                      <Body>
                      <Text>Sankhadeep</Text>
                      <Text note>Its time to build a difference . .</Text>
                      </Body>
                      <Right>
                          <Text note>3:43 pm</Text>
                      </Right>
                  </ListItem>

                  <ListItem>
                      <Thumbnail square size={80} source={{ uri: 'http://placehold.it/300x300' }} />
                      <Body>
                      <Text>Sankhadeep</Text>
                      <Text note>Its time to build a difference . .</Text>
                      </Body>
                      <Right>
                          <Text note>3:43 pm</Text>
                      </Right>
                  </ListItem>
              </List>
          </Content>
        )
    }

}