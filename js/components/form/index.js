
import React, { Component } from 'react';
import { TouchableOpacity,View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon,  List, ListItem, InputGroup, Input, Picker, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

class NHForm extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key0',
      results: {
        items: [],
      },
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value,
    });
  }

  render() {
    return (
      <Container style={{ width : 800, backgroundColor: '#000000' }} >
        <Header style={{ width : 800, height: 100,backgroundColor: '#454545', paddingLeft: 40}} >

          <View style={{ flex: 1, alignItems : 'flex-start', flexDirection: 'row',}}>
            <View style={{ width: 220, height: 30, marginRight:20 }}>
              <InputGroup>
                <Input label="DOMAIN" placeholder="DOMAIN" style={{ width: 120, height: 30 }} />
              </InputGroup>
            </View>
            <View style={{ width: 220, height: 30, marginRight:20 }}>
              <Item>
                <Icon name="search" />
                <Input placeholder="Search" />
                <Icon active name="people" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </View>


            <View style={{ width: 220, height: 30, marginRight:20 }}>
              <InputGroup>
                <Input label="MARKET" placeholder="MARKET" style={{ width: 120, height: 30 }} />
              </InputGroup>
            </View>

          </View>
        </Header>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="First Name" placeholder="John" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Last Name" placeholder="Doe" />
              </InputGroup>
            </ListItem>

            <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="EMAIL" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                <Input placeholder="PASSWORD" secureTextEntry />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-call" style={{ color: '#0A69FE' }} />
                <Input
                  placeholder="PHONE"
                  keyboardType="numeric"
                />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
              <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
              <Text>GENDER</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)} // eslint-disable-line
              >
                <Item label="Male" value="key0" />
                <Item label="Female" value="key1" />
                <Item label="Other" value="key2" />
              </Picker>
            </ListItem>

            <ListItem>
              <InputGroup >
                <Input stackedLabel label="Permanent Address" placeholder="Address" />
              </InputGroup>
            </ListItem>
          </List>
          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>Sign Up</Button>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NHForm);
