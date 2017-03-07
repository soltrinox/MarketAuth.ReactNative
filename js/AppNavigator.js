
import React, { Component } from 'react';
import { AsyncStorage, BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Home from './components/home/';
import Anatomy from './components/anatomy/';
import NHBadge from './components/badge/';
import NHButton from './components/button/';
import NHCard from './components/card/';
import NHCardImage from './components/card/card-image';
import NHCardShowcase from './components/card/card-showcase';
import NHCardList from './components/card/card-list';
import NHCardHeaderAndFooter from './components/card/card-header-and-footer';
import NHCheckbox from './components/checkbox/';
import NHDeckSwiper from './components/deckswiper/';
import NHForm from './components/form/';
import NHIcon from './components/icon/';
import NHInputGroup from './components/inputgroup/';
import NHLayout from './components/layout/';
import NHList from './components/list/';
import NHBasicList from './components/list/basic-list';
import NHListDivider from './components/list/list-divider';
import NHListIcon from './components/list/list-icon';
import NHListAvatar from './components/list/list-avatar';
import NHListThumbnail from './components/list/list-thumbnail';
import NHPicker from './components/picker/';
import NHRadio from './components/radio/';
import NHSearchbar from './components/searchbar/';
import NHSpinner from './components/spinner/';
import NHTabs from './components/tabs/';
import NHThumbnail from './components/thumbnail/';
import NHTypography from './components/typography/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

var DBEvents = require('react-native-db-models').DBEvents;
var DB = require('./db.js');

DBEvents.on("all", function(){
    console.log("Database changed");
});

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
        routes: React.PropTypes.array,
    }),
      selectCategory: React.PropTypes.string,
      selectedDomain : React.PropTypes.string,
      dexPrem: React.PropTypes.array,
      dexPlux: React.PropTypes.array,
      dexBasc: React.PropTypes.array,
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      // this._drawer.close();
    }

      this.openDrawer();
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      // this.props.closeDrawer();
    }
      this.openDrawer();
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'home':
        return <Home />;
      case 'anatomy':
        return <Anatomy />;
      case 'badge':
        return <NHBadge />;
      case 'button':
        return <NHButton />;
      case 'card':
        return <NHCard />;
      case 'cardImage':
        return <NHCardImage />;
      case 'cardShowcase':
        return <NHCardShowcase />;
      case 'cardList':
        return <NHCardList />;
      case 'cardHeaderAndFooter':
        return <NHCardHeaderAndFooter />;
      case 'checkbox':
        return <NHCheckbox />;
      case 'deckswiper':
        return <NHDeckSwiper />;
      case 'form':
        return <NHForm />;
      case 'icon':
        return <NHIcon />;
      case 'inputgroup':
        return <NHInputGroup />;
      case 'layout':
        return <NHLayout  navigator={navigator} {... this.props} />;
      case 'list':
        return <NHList />;
      case 'basicList':
        return <NHBasicList />;
      case 'listDivider':
        return <NHListDivider />;
      case 'listIcon':
        return <NHListIcon />;
      case 'listAvatar':
        return <NHListAvatar />;
      case 'listThumbnail':
        return <NHListThumbnail />;
      case 'picker':
        return <NHPicker />;
      case 'radio':
        return <NHRadio />;
      case 'searchbar':
        return <NHSearchbar />;
      case 'spinner':
        return <NHSpinner />;
      case 'tabs':
        return <NHTabs />;
      case 'thumbnail':
        return <NHThumbnail />;
      case 'typography':
        return <NHTypography />;
      default :
        return <Home />;
    }
  }

  render() {

      {/*openDrawerOffset={0.2}*/}
      {/*panCloseMask={0.2}*/}
      // onClose={() => this.closeDrawer()}
      // tapToClose

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="displace"
        tweenDuration={10}
        content={<SideBar navigator={this._navigator} />}

        initializeOpen={true}
        acceptPan={false}
        openDrawerOffset={800}
        closedDrawerOffset={0}

        onClose={() => {return null} }
        styles={{
          drawer: {
          },
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: {
              // shadowRadius: 0
            },
            main: {
              // opacity: 1, //(2 - ratio) / 2,
            },
          };
        }}
        // negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor.statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
         // renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}

        />
      </Drawer>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
    selectedDomain : state.selectedDomain,
    selectedCategory : state.selectedCategory,
    dexPrem: state.dexPrem,
    dexPlux: state.dexPlux,
    dexBasc: state.dexBasc,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
