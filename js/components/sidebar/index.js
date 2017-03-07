
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import sidebarTheme from './sidebar-theme';
import styles from './style';

const drawerCover = require('../../../img/drawer-cover.png');
const drawerImage = require('../../../img/logo-kitchen-sink.png');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
      selectCategory: React.PropTypes.string,
      selectedDomain : React.PropTypes.string,
      dexPrem: React.PropTypes.array,
      dexPlux: React.PropTypes.array,
      dexBasc: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.state = {
      // shadowOffsetWidth: 0,
      // shadowRadius: 0,
        selectedDomain: 'www.default.com',
        selectedCategory: 'ARCHITECTS',
        dexPrem: [],
        dexPlux: [],
        dexBasc: [],
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content theme={sidebarTheme} style={styles.sidebar} scrollEnabled={ false } >
        <View  style={styles.drawerCover}>
          <View style={{}}>
            <Text style={{ fontSize:22, lineHeight: 25, color: '#b7d4e6', fontWeight:'bold', marginTop:20, paddingLeft:12 }}>CONSUMER</Text>
            <Text style={{ fontSize:22, lineHeight: 25, color: '#b7d4e6', fontWeight:'bold', paddingLeft:12 }}>SEARCH</Text>
            <Text style={{ fontSize:22, lineHeight: 25, color: '#b7d4e6', fontWeight:'bold', paddingLeft:12 }}>RANKINGS</Text>
          </View>
        </View>
        <List>

          <ListItem button  onPress={() => this.navigateTo('anatomy')} >
            <View style={styles.listItemContainer2}>
              <Image source={require('./page.png')}  style={{width: 58, height: 54, backgroundColor: 'transparent'} }  />
              <Text style={styles.text}>Page One</Text>
            </View>
          </ListItem>

          <ListItem button  onPress={() => this.navigateTo('button')} >
            <View style={styles.listItemContainer2}>
              <Image source={require('./cover.png')}  style={{width: 55, height: 52, backgroundColor: 'transparent'} }  />
              <Text style={styles.text}>Performance</Text>
            </View>
          </ListItem>

          <ListItem button  onPress={() => this.navigateTo('layout')} >
            <View style={styles.listItemContainer2}>
              <Image source={require('./call.png')}  style={{width: 57, height: 55, backgroundColor: 'transparent'} }  />
              <Text style={styles.text}>Call Count</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, { backgroundColor: '#00000000' }]}>

              </View>
              <Text style={styles.text}>  </Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('form')} >
            <View style={styles.listItemContainer2}>
              <Image source={require('./gog.png')}  style={{width: 57, height: 55, backgroundColor: 'transparent'} }  />
              <Text style={styles.text}>Settings</Text>
            </View>
          </ListItem>
          <ListItem button   >
            <View style={{ backgroundColor: '#454545', height: 80}}>
              <Image source={require('./markauth.logo.png')}  style={{width: 149, height: 51, backgroundColor: 'transparent'} }  />
            </View>
          </ListItem>
            {/*<ListItem button iconLeft onPress={() => this.navigateTo('form')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
            {/*<View style={[styles.iconContainer, { backgroundColor: '#00000000', paddingLeft: 1 }]}>*/}
            {/*<Icon name="ios-document-outline" style={styles.sidebarIcon} />*/}
            {/*</View>*/}
            {/*<Text style={styles.text}>FORM</Text>*/}
            {/*</View>*/}
            {/*</ListItem>*/}
            {/*<ListItem button iconLeft onPress={() => this.navigateTo('checkbox')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
            {/*<View style={[styles.iconContainer, { backgroundColor: '#EB6B23', paddingLeft: 10 }]}>*/}
            {/*<Icon name="ios-checkmark-circle-outline" style={styles.sidebarIcon} />*/}
            {/*</View>*/}
            {/*<Text style={styles.text}>Check Box</Text>*/}
            {/*</View>*/}
            {/*</ListItem>*/}
            {/*<ListItem button iconLeft onPress={() => this.navigateTo('deckswiper')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
            {/*<View style={[styles.iconContainer, { backgroundColor: '#3591FA', paddingLeft: 10 }]}>*/}
            {/*<Icon name="ios-swap" style={styles.sidebarIcon} />*/}
            {/*</View>*/}
            {/*<Text style={styles.text}>Deck Swiper</Text>*/}
            {/*</View>*/}
            {/*</ListItem>*/}

          {/*<ListItem button iconLeft onPress={() => this.navigateTo('icon')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#B63A48', paddingLeft: 10 }]}>*/}
                {/*<Icon name="ios-information-circle-outline" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Icon</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}

          {/*<ListItem button iconLeft onPress={() => this.navigateTo('layout')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#5C4196' }]}>*/}
                {/*<Icon name="ios-grid-outline" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Layout</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('list')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#00AFC1' }]}>*/}
                {/*<Icon name="ios-lock" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>List</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('picker')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#F50C75', paddingLeft: 10 }]}>*/}
                {/*<Icon name="ios-arrow-dropdown" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Picker</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('radio')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#6FEA90', paddingLeft: 10 }]}>*/}
                {/*<Icon name="ios-radio-button-on" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Radio</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('searchbar')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#29783B' }]}>*/}
                {/*<Icon name="ios-search" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Searchbar</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('spinner')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#BE6F50', paddingLeft: 10 }]}>*/}
                {/*<Icon name="ios-navigate-outline" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Spinner</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('tabs')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#AB6AED' }]}>*/}
                {/*<Icon name="ios-home" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Tabs</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('thumbnail')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#cc0000' }]}>*/}
                {/*<Icon name="ios-image-outline" style={styles.sidebarIcon} />*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Thumbnail</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('typography')} >*/}
            {/*<View style={styles.listItemContainer}>*/}
              {/*<View style={[styles.iconContainer, { backgroundColor: '#48525D', paddingLeft: 7 }]}>*/}
                {/*<Text style={styles.sidebarIcon}>Aa</Text>*/}
              {/*</View>*/}
              {/*<Text style={styles.text}>Typography</Text>*/}
            {/*</View>*/}
          {/*</ListItem>*/}
        </List>
      </Content>
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
    selectedDomain : state.selectedDomain,
    selectedCategory : state.selectedCategory,
    dexPrem: state.dexPrem,
    dexPlux: state.dexPlux,
    dexBasc: state.dexBasc,
});

export default connect(mapStateToProps, bindAction)(SideBar);
