import React, {Component} from 'react';
import {AsyncStorage, BackAndroid, StatusBar, NavigationExperimental} from 'react-native';
import {connect} from 'react-redux';
import {Drawer} from 'native-base';
import {actions} from 'react-native-navigation-redux-helpers';

import {closeDrawer} from './actions/drawer';
import _ from 'lodash';
var stringify = require("json-stringify-pretty-compact");
var DBEvents = require('react-native-db-models').DBEvents;
var DB = require('./db.js');

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

// var sylvester = require("sylvester-es6");
var mathjs  = require('mathjs') ;


const {
    popRoute,
} = actions;

const {
    CardStack: NavigationCardStack,
} = NavigationExperimental;

DBEvents.on("all", function () {
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
            selectedNavCategory: React.PropTypes.string,
            selectedNavDomain: React.PropTypes.string,
            selectedNavCity: React.PropTypes.string,
            dexNavPrem: React.PropTypes.array,
            dexNavPlux: React.PropTypes.array,
            dexNavBasc: React.PropTypes.array,
            rawLocaleNavData: React.PropTypes.array,

            masterCatKeyArray : React.PropTypes.array,
            masterSumDomCoverage : React.PropTypes.array,
            masterSumProdCoverage: React.PropTypes.array,
            masterDomainScoreArray : React.PropTypes.object,
            masterNavCatArray : React.PropTypes.array,
        }),
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            userData: {},
            usersArry: [],
            selectedCity: this.props.navigation.selectedNavCity,
            selectedDomain: this.props.navigation.selectedNavDomain,
            selectedCategory: this.props.navigation.selectedNavCategory,
            marketInputText: this.props.navigation.selectedNavCity,
            domainInputText: this.props.navigation.selectedNavDomain,

            dexPrem: [],
            dexPlux: [],
            dexBasc: [],
            rawLocaleData: [],

            globalCatKeyArray : [],
            globalSumDomCoverage: [],
            globalSumProdCoverage: [],
            domainScoreArray: {},
            globalNavCatArray : [],

            results: {
                items: []
            },
            
            rawArr: [],
            categoriesArr: [],
            keywordArr: [],
            globalCatArr: [],
            globalKeyArr: [],
            globalCatKeyArr: [],

        };

    }

    _confirmGlobalsOnLoad() {
        var confirmGlobMsg = '@@ confirmGlobals || \n ';

        var markVal = _.toString(this.state.marketInputText);
        var domVal = _.toString(this.state.domainInputText);
        var catVal = _.toString(this.state.selectedCategory);
        var rawArrVal = _.toString(this.state.rawArr);

        var globLoc = _.toString(this.props.navigation.selectedNavCity);
        var globDom = _.toString(this.props.navigation.selectedNavDomain);
        var globCat = _.toString(this.props.navigation.selectedNavCategory);
        var rawLocaleData = _.toString(this.props.navigation.rawLocaleNavData);

        if (_.isEqual(rawLocaleData, rawArrVal)) {
            console.log(confirmGlobMsg + 'rawArr = GLOBAL ' + rawLocaleData);
        } else {
            console.log(confirmGlobMsg + 'rawArr != GLOBAL ' + rawLocaleData);
            if (!_.isEmpty(rawLocaleData)) {
                rawArrVal = rawLocaleData;
                this.setState({rawArr: rawLocaleData});
                this.state.rawArr = rawLocaleData;
            }
            if (_.isEmpty(rawArrVal)) {
                if (!_.isEmpty(rawLocaleData)) {
                    rawArrVal = rawLocaleData;
                    this.setState({rawArr: rawArrVal});
                    this.state.rawArr = rawArrVal;
                    this.props.navigation.rawLocaleNavData = rawArrVal;
                }
            }
        }

        if (_.isEqual(markVal, globLoc)) {
            console.log(confirmGlobMsg + 'marketInputText = GLOBAL ' + globLoc);
        } else {
            console.log(confirmGlobMsg + 'NOT marketInputText != GLOBAL ' + globLoc);
            if (!_.isEmpty(globLoc)) {
                markVal = globLoc;
            } else {
                markVal = 'PHOENIX, AZ';
                globLoc = 'PHOENIX, AZ';
            }
            this.setState({marketInputText: globLoc});
            this.state.marketInputText = globLoc;
            this.props.navigation.selectedNavCity = globLoc;
        }

        if (_.isEqual(domVal, globDom)) {
            console.log(confirmGlobMsg + ' domainInputText = GLOBAL ' + globDom);
        } else {
            console.log(confirmGlobMsg + 'NOT domainInputText != GLOBAL ' + globDom);
            if (!_.isEmpty(globDom)) {
                markVal = globDom;
            } else {
                domVal = 'angieslist.com';
                globDom = 'angieslist.com';
            }
            this.setState({domainInputText: globDom});
            this.state.domainInputText = globDom;
            this.props.navigation.selectedNavDomain = globDom;
        }

        if (_.isEqual(catVal, globCat)) {
            console.log(confirmGlobMsg + ' selectedCategory = GLOBAL ' + catVal);
            this.setState({selectedCategory: catVal});
            this.state.selectedCategory = catVal;
            this.props.navigation.selectedNavCategory = catVal;
        } else if (_.isEmpty(catVal)) {
            console.log(confirmGlobMsg + ' selectedCategory != GLOBAL ' + globCat);
            if (!_.isEmpty(globCat)) {
                catVal = globCat;
            } else {
                catVal = 'Carpet Dealer';
                globCat = 'Carpet Dealer';
            }
            this.setState({selectedCategory: catVal});
            this.state.selectedCategory = catVal;
            this.props.navigation.selectedNavCategory = catVal;
        }

        console.log('\n ========== selectedCategory : ' +  this.props.navigation.selectedNavCategory );
        console.log('\n ========== selectedNavDomain : ' +  this.props.navigation.selectedNavDomain );
        console.log('\n ========== selectedNavCity : ' +  this.props.navigation.selectedNavCategory );

        return true;
    }

    _initializeAppData(){

        console.log( '\n ========== \n ========== \n  INIT APPLICATION DATA \n ========== \n ========== \n  ' );
        var catKey = [];

        if(_.isEmpty(this.props.navigation.masterCatKeyArray)){
            var test = [];
            test = require('./CAT.KEY.json');
            catKey = _.orderBy(test, ['CAT', 'KEY'], ['asc', 'asc']);
            this.state.globalCatKeyArray = catKey;
            this.props.navigation.masterCatKeyArray = catKey;
        }else{
            this.state.globalCatKeyArray = this.props.navigation.masterCatKeyArray;
        }

        var testJSON = require('./PHX.003.json');
        // this.state.domainScoreArray = {};
        this.state.rawArr = testJSON;

        // this.state.globalCatArr = [];
        // this.state.globalKeyArr = [];
        // this.state.globalCatKeyArr = [];

        this.state.globalCatArr = [...new Set(catKey.map(item => item.CAT))];
        this.state.globalCatArr.sort();

        this.state.globalKeyArr = [...new Set(catKey.map(item => item.KEY))];
        this.state.globalKeyArr.sort();



        // console.log('\n XXXXXXXXXXX tuu \n ' + stringify(catKey, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');

        var catObjs = [];
        _.forEach(this.state.globalCatArr, function(item) {

           var tempCatKeys = _.filter(catKey, { 'CAT' : item });
            // console.log('\n XXXXXXXXXXX ITEM \n ' + stringify(tempCatKeys, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');
            var tSS = tempCatKeys[0];
            var uii = Math.floor(tSS.KID / 100);

            var tuu = {};
            _.set(tuu,  item  , uii );

            catObjs.push( tuu );
        });

        // console.log('\n XXXXXXXXXXX catObjs \n ' + stringify(catObjs, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');
        // this.state.globalCatKeyArr = catObjs;



    }

    _domainData() {
        console.log( '\n ========== \n ========== \n  PARSING DOMAIN DATA \n ========== \n ========== \n  ' );


        var catKey = [];
        catKey = this.state.globalCatKeyArr;

        console.log('\n XXXXXXXXXXX catKey \n ' + stringify(catKey, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');

        var catCoverage = [];

        //  THIS IS THE KEYWORD LIST WITH A CAL VALUE
        for (var j = 0; j < catKey.length; j++) {

            var trr = [];
            var tky = catKey[j];
            var keyID = _.toString(tky.KID);
            var coverageVal = [];

            trr = _.filter(this.state.rawArr, {'KID': tky.KID });

            var kidArr = [];
            _.forEach(trr, function(value) {
                // console.log('' + value.KID + ' ] ' + value.SUMPROD);
                var sumArr = [];
                sumArr =  _.split(value.SUMPROD, ',');
                coverageVal.push(sumArr);
                kidArr.push( {'DOM': value.DOM , 'KID': value.KID , 'SCORE': sumArr[0] } );
            });

            var colZero =  coverageVal.map(x=> x[0]);
            var colPrem = coverageVal.map(x=> x[4]);
            var colPlus = coverageVal.map(x=> x[3]);
            var colBasc = coverageVal.map(x=> x[2]);
            var scorePrem = mathjs.multiply(colZero,colPrem);
            var scorePlus = mathjs.multiply(colZero,colPlus);
            var scoreBasc = mathjs.multiply(colZero,colBasc);

            // TODO : BUILD LIST OF UNIQUE DOMAINS AND SUM THE SCORE FOR CAT / ALL CHILD KEYS
            this.state.globalSumDomCoverage = [];

            // TODO : GET THE COVERAGE SCORE ACROSS A PRODUCT IN THE CATEGORY FOR ALL CHILD KEYS
            this.state.globalSumProdCoverage = [];

            
            // console.log(' \n ++++++++++++++++++ \n VECT : ' + keyID +' \n PREM : ' + JSON.stringify(scorePrem));
            if(_.isNull(scorePrem)){
                scorePrem = 0;
            }
            var dexPremObj = {};
            _.set(dexPremObj , keyID , scorePrem  );
            this.state.dexPrem.push(dexPremObj);

            // console.log(' \n ++++++++++++++++++ \n VECT : ' + keyID +' \n PLUS : ' + JSON.stringify(scorePlus));
            if(_.isNull(scorePlus)){
                scorePrem = 0;
            }
            var dexPlusObj = {};
            _.set(dexPlusObj , keyID , scorePlus  );
            this.state.dexPlux.push(dexPlusObj);

            // console.log(' \n ++++++++++++++++++ \n VECT : ' + keyID +' \n BASC : ' + JSON.stringify(scoreBasc));
            if(_.isNull(scoreBasc)){
                scorePrem = 0;
            }
            var dexBascObj = {};
            _.set(dexBascObj , keyID , scoreBasc  );
            this.state.dexBasc.push(dexBascObj);

            _.set(this.state.domainScoreArray, keyID, kidArr);


            // _.set(this.state.globalSumProdCoverage, keyID, kidArr);
            // catCoverage.push(coverageVal);

            // console.log('\n  ================= \n  XXXXXXXXXXX kidArr :' +
            //     JSON.stringify(coverageVal)  + '  \n'+  stringify(kidArr, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');
            // JSON.stringify(coverageVal) );
        }

        console.log('\n  ================= \n  XXXXXXXXXXX domainScoreArray :' +
            JSON.stringify(coverageVal)  + '  \n'+  stringify(this.state.domainScoreArray, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');

        // this.props.navigation.dexNavPrem = this.state.dexPrem;
        // this.props.navigation.dexNavPlux =  this.state.dexPlux;
        // this.props.navigation.dexNavBasc =  this.state.dexBasc;
        // this.props.navigation.rawLocaleNavData = this.state.rawLocaleData;
        //
        // this.props.navigation.masterSumDomCoverage =    this.state.globalSumDomCoverage;
        // this.props.navigation.masterSumProdCoverage =   this.state.globalSumProdCoverage;
        // this.props.navigation.masterDomainScoreArray =    this.state.domainScoreArray;
        // this.props.navigation.masterCatKeyArray =   this.state.globalCatKeyArray ;

        // console.log('\n XXXXXXXXXXX STATE domainScoreArray OBJS \n '+
        //     stringify(this.state.domainScoreArray, {maxLength: 0, indent: '\t'}) + ' \n XXXXXXXXXXX ');
        // console.log( '\n ========== \n ========== \n  domainScoreArray \n ========== \n ========== \n  '  );
        // console.log('\n  ' + stringify(catCoverage, {maxLength: 0, indent: '\t'})  );
    }

    componentWillMount() {
        console.log('\n ========== \n ========== \n  NAVIGATOR WILL MOUNT \n ========== \n ========== \n  ');

        var go = false;
        this._initializeAppData();
        go = this._confirmGlobalsOnLoad();
        this._domainData();


        if (go) {

        }
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
                return <NHLayout navigator={navigator} {... this.props} />;
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

        {/*openDrawerOffset={0.2}*/
        }
        {/*panCloseMask={0.2}*/
        }
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
          drawer: { },
        }}
                tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: {
            },
            main: {
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
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
