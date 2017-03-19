import React, {Component} from 'react';
import {ScrollView, AppRegistry, View, TextInput, Image} from 'react-native';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import navigateTo from '../../actions/sideBarNav';

import Picker from 'native-base';
import {
    Container, Header, Title, Content, Text, H3, Button, Icon, Footer,
    FooterTab, StyleSheet, InputGroup, Input, Item, TouchableOpacity, Dimensions
} from 'native-base';


import {openDrawer} from '../../actions/drawer';
import {selectCategory} from '../../actions/drawer';
import {Col, Row, Grid} from 'react-native-easy-grid'
import DeviceInfo from 'react-native-device-info'
import Svg, {G, Rect, Symbol, Use, Defs, Stop} from 'react-native-svg'
import Selection from 'react-native-selection';


import sliderEntryStyles from './SliderEntry.style'
import myTheme from '../../themes/base-theme';
import styles from './styles';

var stringify = require("json-stringify-pretty-compact");
var DBEvents = require('react-native-db-models').DBEvents;
var DB = require('../../db.js');
const _categorySelect1 = '';

DBEvents.on("all", function () {
    console.log("Database changed");
});

class Anatomy extends React.Component {

    _domainInput: any;
    _marketInput: any;
    _categorySelect1: any;

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,

            selectedNavCID: React.PropTypes.number,
            selectedNavCategory: React.PropTypes.string,
            selectedNavDomain: React.PropTypes.string,
            selectedNavMarket: React.PropTypes.string,
            dexNavPrem: React.PropTypes.array,
            dexNavPlux: React.PropTypes.array,
            dexNavBasc: React.PropTypes.array,
            rawLocaleNavData: React.PropTypes.array,
            masterSumProdArr: React.PropTypes.array,

            masterCatKeyArray: React.PropTypes.array,
            masterSumDomCoverage: React.PropTypes.array,
            masterSumProdCoverage: React.PropTypes.array,
            masterDomainScoreObjects: React.PropTypes.object,
            masterNavCatArray: React.PropTypes.array,

        }),
    }

    constructor(props, context) {
        super(props, context);
        this.state = {

            userData: {},
            usersArry: [],

            selectedCID: this.props.navigation.selectedNavCID,
            selectedCity: this.props.navigation.selectedNavMarket,
            selectedDomain: this.props.navigation.selectedNavDomain,
            selectedCategory: this.props.navigation.selectedNavCategory,
            marketInputText: this.props.navigation.selectedNavMarket,
            domainInputText: this.props.navigation.selectedNavDomain,

            dexPrem: this.props.navigation.dexNavPrem,
            dexPlux: this.props.navigation.dexNavPlux,
            dexBasc: this.props.navigation.dexNavBasc,
            rawLocaleData: this.props.navigation.rawLocaleNavData,
            globalSumProdArr: this.props.navigation.masterSumProdArr,

            globalSumDomCoverage: this.props.navigation.masterSumDomCoverage,
            globalSumProdCoverage: this.props.navigation.masterSumProdCoverage,
            domainScoreObjects: this.props.navigation.masterDomainScoreObjects,
            globalCatKeyArray: this.props.navigation.masterCatKeyArray,
            globalNavCatArray: this.props.navigation.masterNavCatArray,

            selectedDomainTotal: 2,
            columnTotal1: 0,
            columnTotal2: 0,
            columnTotal3: 0,
            columnTotal4: 0,

            dexPremObj : [],
            dexPluxObj : [],
            dexBascObj : [],

            results: {
                items: []
            },

            message: 'Try clicking the top-right menus',
            dataObjects: {},
            rawArr: [],
            categoriesArr: [],
            keywordArr: []
        };

        this._getUsers = this._getUsers.bind(this);
        this._updateText = this._updateText.bind(this);

    }

    navigateTo(route) {
        this.props.navigateTo(route, 'home');
    }

    onValueChange(value: string) {
        this.setState({
            selectedCategory: value,
        });
    }

    _getUsers() {
        this.state.userData = {'key': 'val', 'key': 'val'};
        fetch("https://www.randomuser.me/api/1.1?nat=us")
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('responseData :' + JSON.stringify(responseData.results));
                this.setState({userData: responseData.results});
                // console.log('AFTER USER DATA: ' + JSON.stringify(this.state.userData));
            })
            .done();

        // console.log('2222222 USER DATA: ' + JSON.stringify(this.state.userData));
    }

    _updateText(ddomain) {
        this.setState({selectedDomain: ddomain});
    }

    _persistObjects() {
        DB.dexBasc.get({CAT: catName}, function (result) {
            if (_.isEmpty(result)) {
                console.log('\n @@@@@@@@ EMPTY dexBasc NO ' + catName + ' ..... ');

            } else {
                console.log('\n ######## EXISTS dexBasc  : ' + stringify(result, {maxLength: 0, indent: '\t'}));
                r
            }
        });

        DB.dexPlux.get({CAT: catName}, function (result) {
            if (_.isEmpty(result)) {
                console.log('\n @@@@@@@@ EMPTY dexPlux NO ' + catName + ' ..... ');

            } else {
                console.log('\n ######## EXISTS dexPlux : ' + stringify(result, {maxLength: 0, indent: '\t'}));

            }
        });

        DB.dexPrem.get({CAT: catName}, function (result) {
            if (_.isEmpty(result)) {
                console.log('\n @@@@@@@@ EMPTY dexPrem NO ' + catName + ' ..... ');
            } else {
                console.log('\n ######## EXISTS dexPrem : ' + stringify(result, {maxLength: 0, indent: '\t'}));
            }
        });


        // var devPluxUpdate = { };
        // devPluxUpdate["CAT"] = catName;
        // devPluxUpdate["KEYS"] = tabPlux;
        // console.log('\n  : devPluxUpdate  = ' + stringify(devPluxUpdate, {maxLength: 0, indent: '\t'}) );
        // this._addDexPlux(devPluxUpdate);
        //
        // var devPremUpdate = { };
        // devPremUpdate["CAT"] = catName;
        // devPremUpdate["KEYS"] = tabPrem;
        // console.log('\n : devPremUpdate  = ' + stringify(devPremUpdate, {maxLength: 0, indent: '\t'}) );
        // this._addDexPrem(devPremUpdate);
        //
        // var devBascUpdate = { };
        // devBascUpdate["CAT"] = catName;
        // devBascUpdate["KEYS"] = tabBasc;
        // console.log('\n  : devBascUpdate  = ' + stringify(devBascUpdate, {maxLength: 0, indent: '\t'}) );
        // this._addDexBasc(devBascUpdate);

        // DB.dexPrem.erase_db(function(removed_data3){
        //     console.log(removed_data3);
        // });
        //
        // DB.dexPlux.erase_db(function(removed_data2){
        //     console.log(removed_data2);
        // });
        //
        // DB.dexBasc.erase_db(function(removed_data){
        //     console.log(removed_data);
        // });

        // DB.dexBasc.get_all(function (result2) {
        //     console.log('\n  ------ dexBasc get_all : ' + stringify(result2, {maxLength: 0, indent: '\t'}) );
        // });

    }

    _resetGridColumnTotal() {
        this.setState({columnTotal1: 0});
        this.setState({columnTotal2: 0});
        this.setState({columnTotal3: 0});
        this.setState({columnTotal4: 0});
    }

    _returnDataOnSelection(item, e) {


        console.log('\n ========= \n e.VALUE \n' + JSON.stringify(e));
        // console.log('\n ========= \n item \n' + e.cid);

        this._resetGridColumnTotal();

        var catName = e.value;
        var cid = e.cid;
        if (_.isUndefined(e.value)) {
            catName = this.props.navigation.selectedNavCategory;
            cid = this.props.navigation.selectedNavCID;
        } else {
            catName = e.value;
            cid = e.cid;
            this.props.navigation.selectedNavCategory = catName;
            this.props.navigation.selectedNavCID = cid;
        }
        this.setState({selectedCID: cid});
        this.props.navigation.selectedNavCID = cid;
        this.setState({selectedCategory: catName});
        this.props.navigation.selectedNavCategory = catName;
        this._updateGrids(catName, cid);
    }

    _updateGrids(catName, cid) {

        console.log('@@@@@@@ dexPremObj @ ' + JSON.stringify(this.state.dexPrem));
        console.log('@@@@@@@ dexPlux @ ' + JSON.stringify(this.state.dexPlux));

        console.log('\n catName: ' + JSON.stringify(catName));
        console.log('\n cid: ' + JSON.stringify(cid));

        this.props.navigation.selectedNavCategory = _.toString(catName);
        this.props.navigation.selectedNavCID = _.toNumber(cid);


        var keysForThisCat = _.filter(this.state.globalCatKeyArray,
            function (o) {
                var xcid = Math.floor(o.KID / 100);
                if (xcid === cid) {
                    return o
                }
            });


        this._resetGridColumnTotal();


        var keys = [...new Set(keysForThisCat.map(item => item.KEY))];
        console.log(' \n ++++++++++++++++++ \n keys : ' + JSON.stringify(keys));
        keys.sort();
        this.setState({keywordArr: keysForThisCat});
        // this.setState({dataObjects: upp});

        /*
         // console.log('########### DOMAINS BY KEY ON : ' + JSON.stringify(keysForThisCat));
         // var resultXXX = _.filter(test, function (p) {
         //     return _.includes(keysForThisCat, p.KEY);
         // });

         // var testDomains = _.orderBy(resultXXX, ['KEY', 'SCORE'], ['asc', 'desc']);
         // console.log('########### MATCHED DOMAINS BY KEY : ' + JSON.stringify(testDomains));
         */

        this.state.dexPremObj = [];
        this.state.dexPluxObj = [];
        this.state.dexBascObj = [];

    var dexPremObjVals = [];
    var dexPluxObjVals = [];

        var dexPluxTemp = this.state.dexPlux;
        for (var h = 0; h < dexPluxTemp.length; h++) {
            var utemp2 = dexPluxTemp[h];
            _.forEach(keysForThisCat, function (value) {
                var kky2 = _.toString(value.KID);
                var yyd2 = Object.keys(utemp2)[0];
                if (utemp2.hasOwnProperty(kky2)) {
                    // console.log('@@@@@@@ FOUND @ ' + yyd + ' \n' + JSON.stringify(utemp[kky]));
                    var dd2 = _.toNumber(utemp2[kky2]);
                    dexPluxObjVals.push(dd2);
                }
            });
        }

        var dexPremTemp = this.state.dexPrem;
        for (var x = 0; x < dexPremTemp.length; x++) {
            var utemp = dexPremTemp[x];
            _.forEach(keysForThisCat, function (value) {
                var kky = _.toString(value.KID);
                var yyd = Object.keys(utemp)[0];
                if (utemp.hasOwnProperty(kky)) {
                    // console.log('@@@@@@@ FOUND @ ' + yyd + ' \n' + JSON.stringify(utemp[kky]));
                    var dd = _.toNumber(utemp[kky]);
                    dexPremObjVals.push(dd);
                }
            });
        }

        this.setState({dexPremObj: dexPremObjVals});
        this.setState({dexPluxObj: dexPluxObjVals});


        console.log('@@@@@@@ dexPremObj @ ' + JSON.stringify(this.state.dexPremObj));
        console.log('@@@@@@@ dexPluxObj @ ' + JSON.stringify(this.state.dexPluxObj));
        // console.log('@@@@@@@ dexBasc @ ' + JSON.stringify(dexBascObj));

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _renderPicker() {
        this.props.navigation.masterNavCatArray.map((item, index) => {
                console.log(JSON.stringify(item));

                var itemString = JSON.stringify(item.CAT);
                var itemVal = JSON.stringify(item.CID);
                return ( <Picker.Item label={itemString} value={itemVal} key={index}/> )
            }
        )
    }

    _updateGlobals(tyype, vval) {

        var tyypeValue = _.toString(tyype);

        if (( tyypeValue === 'market') || ( tyypeValue === 'LOC')) {
            this.state.marketInputText = _.toString(vval);
            this.props.navigation.selectedNavMarket = _.toString(vval);
            console.log('this.state.marketInputText : ' + stringify(this.state.marketInputText, {
                    maxLength: 0,
                    indent: '\t'
                }));
        }
        if (( tyypeValue === 'domain') || ( tyypeValue === 'DOM')) {
            this.state.domainInputText = _.toString(vval);
            this.props.navigation.selectedNavDomain = _.toString(vval);
            console.log('this.state.domainInputText : ' + stringify(this.state.domainInputText, {
                    maxLength: 0,
                    indent: '\t'
                }));
        }
        if (( tyypeValue === 'cat') || ( tyypeValue === 'CAT')) {
            this.state.selectedCategory = _.toString(vval);
            this.props.navigation.selectedNavCategory = _.toString(vval);
            console.log('this.state.selectedCategory : ' + stringify(this.state.selectedCategory, {
                    maxLength: 0,
                    indent: '\t'
                }));
        }

    }


    _reportEmptyObj(objName) {
        console.log('\n !!!!!!!!!!!!! \n !!!!!!!!!  EMPTY OBJECT  !!!!!!!!!!!!\n ' + objName + '\n !!!!!!!!!!!!!');
    }

    _confirmGlobalsOnLoad() {
        var confirmGlobMsg = '@@ confirmGlobals || \n ';

        var markVal = _.toString(this.state.marketInputText);
        var domVal = _.toString(this.state.domainInputText);
        var catVal = _.toString(this.state.selectedCategory);
        var globLoc = _.toString(this.props.navigation.selectedNavMarket);
        var globDom = _.toString(this.props.navigation.selectedNavDomain);
        var globCat = _.toString(this.props.navigation.selectedNavCategory);


        if (_.isEmpty(this.props.navigation.dexNavPrem)) {
            this._reportEmptyObj('this.props.navigation.dexNavPrem')
        }
        if (_.isEmpty(this.props.navigation.dexNavPlux)) {
            this._reportEmptyObj('this.props.navigation.dexNavPlux')
        }
        if (_.isEmpty(this.props.navigation.dexNavBasc)) {
            this._reportEmptyObj('this.props.navigation.dexNavBasc')
        }
        if (_.isEmpty(this.props.navigation.rawLocaleNavData)) {
            this._reportEmptyObj('this.props.navigation.rawLocaleNavData')
        }

        if (_.isEmpty(this.props.navigation.masterCatKeyArray)) {
            this._reportEmptyObj('this.props.navigation.masterCatKeyArray');
        }
        if (_.isEmpty(this.props.navigation.masterNavCatArray)) {
            this._reportEmptyObj('this.props.navigation.masterNavCatArray');
        } else {
            this._updateCategoryArray();
        }
        if (_.isEmpty(this.props.navigation.masterSumDomCoverage)) {
            this._reportEmptyObj('this.props.navigation.masterSumDomCoverage');
        }
        if (_.isEmpty(this.props.navigation.masterSumProdCoverage)) {
            this._reportEmptyObj('this.props.navigation.masterSumProdCoverage');
        }
        if (_.isEmpty(this.props.navigation.masterDomainScoreObjects)) {
            this._reportEmptyObj('this.props.navigation.masterDomainScoreObjects');
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
            this.props.navigation.selectedNavMarket = globLoc;
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
        return true;
    }

    _updateCategoryArray() {
        var catKey = [];
        catKey = this.props.navigation.masterNavCatArray;
        // console.log('\n masterCatKeyArray \n'+stringify(catKey, {maxLength: 0, indent: '\t'}));
        var happy = [];

        _.forEach(catKey, function (item) {
            var catName = item.CAT;
            var catID = item.CID;
            happy.push({name: catName, value: catName, cid: catID, icon: '',});

        });
        this.state.categoriesArr = happy;
        this.state.categoriesArr.sort();

        // console.log('\n categoriesArr \n'+JSON.stringify(this.state.categoriesArr));
    }

    componentWillMount() {

        console.log('\n ========== \n ========== \n  PAGE ONE WILL MOUNT \n ========== \n ========== \n  ');
        var go = false;
        go = this._confirmGlobalsOnLoad();
        if (go) {
            this._updateCategoryArray();
            this._updateGrids(this.state.selectedCategory, this.state.selectedCID);
        }
    }

    componentDidMount() {
        this._resetGridColumnTotal();
    }

    render() {
        var gridCol1Total = 0;
        var gridCol2Total = 0;


        return (
            <Container theme={myTheme} style={{ width : 800, backgroundColor: '#000000'}}>
                <Header style={{ width : 800, height:100, backgroundColor: '#454545', paddingLeft: 40}}>
                    <View style={{ flex: 1, alignItems : 'flex-start', flexDirection: 'row',}}>
                        <View style={{ width: 220, height: 30, marginRight:20 }}>

                            <TextInput ref={(domainInput) => { this._domainInput = domainInput; }}
                                       defaultValue={this.state.domainInputText}
                                       style={{ borderRadius: 8, backgroundColor: '#2c75ab', width: 210, height: 30, color: 'white', fontWeight: 'bold',
                                       fontSize: 20, lineHeight:22, textAlign: 'center' }}
                                       clearTextOnFocus={true}
                                       onEndEditing={(event) => this._updateGlobals( 'domain', event.nativeEvent.text  )}/>

                        </View>
                        <View style={{ width: 220, height: 30, marginRight:10,  }}>
                            <Selection
                                ref={(categorySelect1) => { this._categorySelect1 = categorySelect1; }}
                                titleCustomize={true}
                                title={this.state.selectedCategory}
                                options={this.state.categoriesArr}
                                onSelection={(e) => this._returnDataOnSelection(this,e)}

                                style={{
                                    main:{
                                      backgroundColor: '#2c75ab',
                                      borderRadius: 8,
                                      width: 220, height: 30
                                    },
                                 color: '#FFF',
                                  textColor : '#FFF',
                                  backgroundColor: '#2c75ab',
                                  body: {
                                      width: 400,
                                      backgroundColor: '#ffffff',
                                      maxHeight: 400,
                                      borderRadius: 5,
                                      overflow: 'hidden',
                                  },
                                  option: {
                                      width: 400,
                                      padding: 10,

                                      borderBottomWidth: 1,
                                      borderBottomColor: '#cccccc',
                                      flexDirection: 'row',
                                  },
                                  optionText:{
                                        color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    lineHeight:22,
                                  },
                                  textx:{
                                    paddingTop:3,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    lineHeight:22,
                                    height:30,
                                    textAlign: 'center',
                                    backgroundColor: '#00000000',
                                    borderRadius: 8,
                                  }
                                }}
                                iconSize={20}
                                iconColor="#eee"
                            />

                        </View>
                        <View style={{ width: 220, height: 30, marginRight:20 }}>

                            <Input ref={(marketInput) => { this._marketInput = marketInput; }}
                                   style={{ borderRadius: 8, backgroundColor: '#2c75ab', width: 210, height: 30, color: 'white', fontWeight: 'bold',
                                       fontSize: 20, lineHeight:22, textAlign: 'center' }}
                                   defaultValue={this.state.marketInputText}
                                   clearTextOnFocus={true}
                                   onEndEditing={(event) => this._updateGlobals( 'market', event.nativeEvent.text  )}/>

                        </View>
                    </View>
                </Header>

                <Content styel={{flex: 1,
        flexDirection: 'column',
        justifyContent:'flex-start',}} scrollEnabled={ false }>
                    <Image
                        style={styles.stretch}
                        source={require('./img001.png')}
                        resizeMode={Image.resizeMode.stretch}
                    >
                        <View
                            style={{ height:666, flexDirection: 'column', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.85)'}}>
                            <View
                                style={{height:null,  flex:1, flexDirection:'row', justifyContent:'flex-start', marginLeft:0,  backgroundColor: 'rgba(0,0,0,0.0)',  }}>
                                <Text
                                    style={{ marginTop:20, width:400, height:40,overflow:'hidden', color:'#00ff00', lineHeight:38, fontSize: 36, fontWeight:'bold' , paddingLeft:20, textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.5)',  }}
                                    ellipsizeMode={'tail'} numberOfLines={1}>
                                    {this.state.selectedCategory}
                                </Text>
                                <Text style={{ marginTop:20, width:400, height:40,overflow:'hidden', color:'#ffffff', lineHeight:38, fontSize: 36, fontWeight:'bold' , paddingRight:20, textAlign: 'right',
                                backgroundColor: 'rgba(0,0,0,0.5)', }} ellipsizeMode={'tail'} numberOfLines={1}>
                                    {this.state.selectedCity}
                                </Text>
                            </View>
                            <View
                                style={{ height:40, paddingTop:8, flexDirection: 'column',overflow:'hidden', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.0)'}}>
                                <Text
                                    style={{flex:1, width:800, height:40, flexDirection: 'row', textAlign: 'center' , color:'#ABABAB',  fontSize: 22 }}
                                    ellipsizeMode={'tail'} numberOfLines={1}>
                                    Top 10 Searches for {this.state.selectedCategory} in {this.state.selectedCity}
                                </Text>
                            </View>
                            <View
                                style={{ height:62,  flexDirection:'row', justifyContent:'flex-start', backgroundColor: 'rgba(0,0,0,0)', marginLeft:5 }}>
                                <View
                                    style={{ width:300, height:62, overflow: 'hidden',
                                    borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', marginRight:5, justifyContent:'center'}}>
                                    <Text
                                        style={{ color:'#FFFFFF', fontSize: 24, lineHeight:28, fontWeight:'normal',textAlign:'center'  }}>
                                        SEARCH TERM</Text>
                                </View>
                                <View
                                    style={{ width:480, height:62, backgroundColor: 'rgba(0,0,0,0)',
                            overflow:'hidden',flexDirection:'row'   }}>
                                    <View
                                        style={{ width:240, height:62, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text
                                            style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'    }}
                                            ellipsizeMode={'tail'} numberOfLines={1}>
                                            ESS Plus</Text>
                                    </View>
                                    <View
                                        style={{ width:240, height:62, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text
                                            style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'   }}
                                            ellipsizeMode={'tail'} numberOfLines={1}>
                                            ESS PREMIUM</Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{ height:365, marginTop:5,  flexDirection:'row', overflow: 'hidden', justifyContent:'flex-start', backgroundColor: 'rgba(0,0,0,0)', marginLeft:5 }}>
                                <View
                                    style={{ width:300, height:495, overflow: 'hidden', borderRadius:0, backgroundColor: 'rgba(0,0,0,0)', marginRight:5}}>

                                    <Grid style={{ flex:1 }}>
                                        {
                                            this.state.keywordArr.map((item, index) => {
                                                    var itemString = JSON.stringify(item);
                                                    return (
                                                        <Row
                                                            style={{ backgroundColor: '#454545', height: 30, marginBottom: 2,  justifyContent:'center' }}
                                                            key={index}>
                                                            <View
                                                                style={{ paddingTop:4, paddingLeft: 3, height:30,  width:300, backgroundColor: "rgba(0,0,0,0)",  justifyContent:'center' }}>
                                                                <Text
                                                                    style={{ textAlignVertical: 'bottom', height:30,  width:300, color: "#FFFFFF", fontSize: 21, lineHeight:22, textAlign: 'left' , }}
                                                                    ellipsizeMode={'tail'} numberOfLines={1}>

                                                                     {item.KEY}
                                                                </Text>
                                                            </View>
                                                        </Row>
                                                    )
                                                }
                                            )
                                        }
                                    </Grid>

                                </View>
                                <View
                                    style={{ width:480, height:495, backgroundColor: 'rgba(0,0,0,0)',
                            overflow:'hidden',flexDirection:'row'   }}>
                                    <View accessibilityLabel={'gridPlus'}
                                          style={{ width:240, height:495, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#000', padding:0,marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            {

                                                this.state.keywordArr.map((item, index) => {
                                                    console.log('\n keyWord : ' + JSON.stringify(item));
                                                        var kray = [];

                                                    var tempScore = this.state.dexPluxObj[index];
                                                    console.log('\n tempScore : ' + JSON.stringify(tempScore));



                                                        for (var k = 0; k < tempScore; k++) {
                                                            kray.push(<Svg height="20" width="20" key={k}>
                                                                <Rect
                                                                    x="0"
                                                                    y="0"
                                                                    width="18"
                                                                    height="18"
                                                                    stroke="black"
                                                                    strokeWidth="1"
                                                                    fill="green"
                                                                />
                                                            </Svg>);
                                                        }

                                                        gridCol1Total = gridCol1Total + _.toInteger(tempScore);
                                                        tempScore = 0;


                                                        return (
                                                            <Row
                                                                style={{ backgroundColor: '#454545', height: 30 ,marginBottom: 2 }}
                                                                key={index}>
                                                                <View key={index}
                                                                      style={{ paddingVertical: 3, paddingLeft: 3, height:30,  width:240,
                                                                backgroundColor: "rgba(0,0,0,0)",
                                                            }}>
                                                                    <View style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-start',
                                                                marginTop:3
                                                                }}>
                                                                        { kray }
                                                                    </View>
                                                                </View>
                                                            </Row>
                                                        )
                                                    }
                                                )
                                            }
                                            <Row style={{ backgroundColor: '#454545', height: 30,marginBottom: 4 }}
                                                 key={98}>
                                                <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            }}>
                                                    <Text
                                                        style={{ textAlignVertical: 'bottom',height: 30, color:'#FFFFFF', fontWeight:'bold',  fontSize: 25,lineHeight:26, textAlign: 'center'}}>
                                                        { gridCol1Total } </Text>
                                                </View>
                                            </Row>
                                        </Grid>
                                    </View>
                                    <View accessibilityLabel={'gridPrem'}
                                          style={{ width:240, height:495, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#0000', padding:0, marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            {

                                                this.state.keywordArr.map((item, index) => {
                                                        console.log('\n keyWord : ' + JSON.stringify(item));
                                                        var kray2 = [];

                                                        var tempScore2 = this.state.dexPremObj[index];
                                                        console.log('\n tempScore : ' + JSON.stringify(tempScore2));



                                                        for (var k = 0; k < tempScore2; k++) {
                                                            kray2.push(<Svg height="20" width="20" key={k}>
                                                                <Rect
                                                                    x="0"
                                                                    y="0"
                                                                    width="18"
                                                                    height="18"
                                                                    stroke="black"
                                                                    strokeWidth="1"
                                                                    fill="green"
                                                                />
                                                            </Svg>);
                                                        }

                                                        gridCol2Total = gridCol2Total + _.toInteger(tempScore2);
                                                        tempScore2 = 0;


                                                        return (
                                                            <Row
                                                                style={{ backgroundColor: '#454545', height: 30 ,marginBottom: 2 }}
                                                                key={index}>
                                                                <View key={index}
                                                                      style={{ paddingVertical: 3, paddingLeft: 3, height:30,  width:240,
                                                                backgroundColor: "rgba(0,0,0,0)",
                                                            }}>
                                                                    <View style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-start',
                                                                marginTop:3
                                                                }}>
                                                                        { kray2 }
                                                                    </View>
                                                                </View>
                                                            </Row>
                                                        )
                                                    }
                                                )
                                             }
                                            <Row style={{ backgroundColor: '#454545', height: 30,marginBottom: 4 }}
                                                 key={99}>
                                                <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            }}>
                                                    <Text
                                                        style={{ textAlignVertical: 'bottom',height: 30, color:'#FFFFFF', fontWeight:'bold',  fontSize: 25,lineHeight:26, textAlign: 'center'}}>
                                                        {gridCol2Total } </Text>
                                                </View>
                                            </Row>
                                        </Grid>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{ height:120, paddingTop:8, flexDirection: 'column', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.5)'}}>
                                <Text style={{flex:1, flexDirection: 'row', textAlign: 'center' ,
                   color:'#ABABAB',  fontSize: 18 }}>
                                    keywords for <Text
                                    style={{ color:'#ff00ff', fontSize: 22, fontWeight:'700'  }}>{this.state.selectedCategory}</Text>
                                    @ <Text style={{ color:'#0000FF', fontSize: 22, fontWeight:'bold'  }}>
                                    {this.state.selectedCity}</Text>
                                </Text>
                                <Text style={{flex:1, lineHeight:12, flexDirection: 'row', textAlign: 'left' ,
                   color:'#ABABAB',  fontSize: 11 }}>
                                    This is a service message for users and disclosure.  This is a service message for users and disclosure.
                                 This is a service message for users and disclosure.  This is a service message for users and disclosure.
                                 This is a service message for users and disclosure.  This is a service message for users and disclosure.
                                 This is a service message for users and disclosure. </Text>

                            </View>
                        </View>
                    </Image>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(Anatomy);
