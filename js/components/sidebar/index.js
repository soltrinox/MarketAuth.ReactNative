
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Footer, Content, Text, List, ListItem, Icon, View } from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import sidebarTheme from './sidebar-theme';
import styles from './style';


class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
      navigation: React.PropTypes.shape({
          key: React.PropTypes.string,
          selectedNavCategory: React.PropTypes.string,
          selectedNavDomain: React.PropTypes.string,
          selectedNavCity: React.PropTypes.string,
          dexNavPrem: React.PropTypes.array,
          dexNavPlux: React.PropTypes.array,
          dexNavBasc: React.PropTypes.array,
          rawLocaleNavData: React.PropTypes.array,
      }),
  };

  constructor(props) {
    super(props);
    this.state = {
      // shadowOffsetWidth: 0,
      // shadowRadius: 0,
        selectedCity: this.props.navigation.selectedNavCity,
        selectedDomain: this.props.navigation.selectedNavDomain,
        selectedCategory: this.props.navigation.selectedNavCategory,
        marketInputText : this.props.navigation.selectedNavCity,
        domainInputText : this.props.navigation.selectedNavDomain,
        dexPrem: this.props.navigation.dexNavPrem,
        dexPlux: this.props.navigation.dexNavPlux,
        dexBasc: this.props.navigation.dexNavBasc,
        rawLocaleData : this.props.navigation.rawLocaleNavData

    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container theme={myTheme}>
        <Header>
          <View  style={styles.drawerCover}>
            <Image source={require('./OrganicSearchLogo.png')}  />
          </View>
        </Header>
        <Content>
          <List theme={sidebarTheme} style={{borderWidth: 2, borderColor: '#00FF00'}}>
            <ListItem button  onPress={() => this.navigateTo('button')} >
              <View style={styles.listItemContainer2}>
                <Image source={require('./PageOneIcon.png')}  style={styles.iconContainer} />
                <Text style={styles.text}>Google Page One</Text>
              </View>
            </ListItem>

            <ListItem button  onPress={() => this.navigateTo('anatomy')} >
              <View style={styles.listItemContainer2}>
                <Image source={require('./SearchTermPerformanceIcon.png')}  style={styles.iconContainer} />
                <Text style={styles.text}>Search Term Performance</Text>
              </View>
            </ListItem>

            <ListItem button  onPress={() => this.navigateTo('layout')} >
              <View style={styles.listItemContainer2}>
                <Image source={require('./CallCountIcon.png')}  style={styles.iconContainer}  />
                <Text style={styles.text}>Ad Call Estimator</Text>
              </View>
            </ListItem>
          </List>
        </Content>
        <Footer>
          <View>
            <List>
              <ListItem button iconLeft onPress={() => this.navigateTo('form')} >
                <View style={styles.listItemContainer2}>
                  <Image source={require('./cogIcon.png')}  style={styles.iconContainer}  />
                  <Text style={styles.text}>Settings</Text>
                </View>
              </ListItem>
              <ListItem button>
                <View style={{ backgroundColor: '#454545', height: 80}}>
                  <Image source={require('./MarketAuthorityLogo.png')}  style={{alignSelf: 'center', width: 145, height: 48, backgroundColor: 'transparent'} }  />
                </View>
              </ListItem>
            </List>
          </View>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,

});

export default connect(mapStateToProps, bindAction)(SideBar);
