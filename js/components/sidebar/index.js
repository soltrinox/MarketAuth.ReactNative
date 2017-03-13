
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Footer, Content, Text, List, ListItem, Icon, View} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import sidebarTheme from './sidebar-theme';
import styles from './style';

const headerlogo = require('./OrganicSearchLogo.png');
const footerlogo = require('./MarketAuthorityLogo.png');
const settingsicon = require('./cogIcon.png');
const pageoneicon = require('./PageOneIcon.png');
const searchperformanceicon = require('./SearchTermPerformanceIcon.png');
const callcounticon = require('./CallCountIcon.png');


const datas = [
  {
    name: 'Google Page One',
    route: 'button',
    icon: pageoneicon
  },
  {
    name: 'Search Term Performance',
    route: 'anatomy',
    icon: searchperformanceicon
  },
  {
    name: 'Ad Call Estimator',
    route: 'layout',
    icon: callcounticon
  }
];

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
      <Container theme={myTheme} style={{backgroundColor: '#454545'}}>
        <Header style={{height: 105, backgroundColor: '#454545', borderBottomWidth: 1}}>
          <View  style={styles.headerLogo}>
            <Image source={headerlogo} />
          </View>
        </Header>

        <Content>
          <List
              dataArray={datas} renderRow={data =>
              <ListItem
                  style={styles.listItemContainer}
                  button
                  onPress={() => this.navigateTo(data.route)}
              >
                <View style={styles.listItem}>
                  <Image source={data.icon}  style={styles.iconContainer} />
                  <Text style={styles.text}>{data.name}</Text>
                </View>
              </ListItem>}
          />

        </Content>
        <Footer theme={myTheme} style={{backgroundColor: '#454545', flexDirection: 'column', height: 160, borderTopColor: '#000'}}>
          <View>
            <List style={{width: 220}}>
              <ListItem
                  style={styles.listItemContainer}
                  button
                  iconLeft
                  onPress={() => this.navigateTo('form')}
              >
                <View style={styles.listItem}>
                  <Image source={settingsicon}    />
                  <Text style={styles.text}>Settings</Text>
                </View>
              </ListItem>
              <ListItem button>
                <View style={{height: 60}}>
                  <Image source={footerlogo}  style={{alignSelf: 'center', width: 145, height: 48, backgroundColor: 'transparent'}}  />
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
