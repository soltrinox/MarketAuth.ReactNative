import React, {Component} from 'react';
import {ScrollView, AppRegistry, View, TextInput, Image, TouchableHighlight, AlertIOS,} from 'react-native';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import Picker from 'native-base';
import {
    Container, Header, Title, Content, Text, H3, Button, Icon,
    Footer, FooterTab, StyleSheet,
    InputGroup,

    Input, Item,
    TouchableOpacity,
    Dimensions
} from 'native-base';


import {openDrawer} from '../../actions/drawer';
import {selectCategory} from '../../actions/drawer';
import {Col, Row, Grid} from 'react-native-easy-grid'
import DeviceInfo from 'react-native-device-info'
import Svg, {G, Rect, Symbol, Use, Defs, Stop} from 'react-native-svg'
import Selection from 'react-native-selection';
import LinearGradient from 'react-native-linear-gradient';

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

class NHButton extends React.Component {

    _domainInput: any;
    _marketInput: any;
    _categorySelect1: any;


    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,

            selectedNavCategory: React.PropTypes.string,
            selectedNavDomain: React.PropTypes.string,
            selectedNavMarket: React.PropTypes.string,
            dexNavPrem: React.PropTypes.array,
            dexNavPlux: React.PropTypes.array,
            dexNavBasc: React.PropTypes.array,
            rawLocaleNavData: React.PropTypes.array,
            masterSumProdArr : React.PropTypes.array,

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
            globalCatKeyArray : this.props.navigation.masterCatKeyArray,
            globalNavCatArray :this.props.navigation.masterNavCatArray,


            results: {
                items: []
            },

            selectedDomainTotal: 2,
            columnTotal1: 0,
            columnTotal2: 0,
            columnTotal3: 0,
            columnTotal4: 0,

            domainPercentage: '25 %',
            productPercentage: '100 %',

            domainName: this.props.navigation.selectedNavDomain,
            productName: 'DEX ESS Premium',

            domainBars: [],
            productBars: [],

            domainTotal: 0,
            productTotal: 0,

            message: 'Try clicking the top-right menus',
            dataObjects: {},
            rawArr: [],
            categoriesArr: [],
            keywordArr: []
        };

        this._getUsers = this._getUsers.bind(this);

        // this._returnDataOnSelection = this._returnDataOnSelection.bind(this);
    }

    _reportEmptyObj(objName){
        console.log('\n !!!!!!!!!!!!! \n !!!!!!!!!  EMPTY OBJECT  !!!!!!!!!!!!\n ' +  objName + '\n !!!!!!!!!!!!!' );
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

    _resetGridColumnTotal() {
        this.setState({columnTotal1: 0});
        this.setState({columnTotal2: 0});
        this.setState({columnTotal3: 0});
        this.setState({columnTotal4: 0});
    }

    _returnDataOnSelection(item, e) {

        this._resetGridColumnTotal();

        var catName = '';
        if (_.isUndefined(e.value)) {
            if (_.isUndefined(this.props.navigation.selectedNavCategory)) {
                catName = '';
            } else {
                catName = this.props.navigation.selectedNavCategory;
            }
        } else {
            catName = e.value;
            this.props.navigation.selectedNavCategory = catName;
        }
        this.setState({selectedCategory: catName});
        this._updateGlobals('CAT', catName);
        this._updateGrids(catName);
    }

    _updateGrids(catName) {

        this.props.navigation.selectedNavCategory = _.toString(catName);

        this._resetGridColumnTotal();

        var test = _.orderBy(this.state.rawArr, ['CAT', 'KEY', 'SCORE'], ['asc', 'asc', 'desc']);
        var trr = _.filter(test, {"CAT": catName});
        var upp = {catName: trr};
        var kkt = [...new Set(trr.map(item => item.KEY))];
        kkt.sort();
        this.setState({keywordArr: kkt});
        this.setState({dataObjects: upp});


        var dexPremObj = [];
        var dexPluxObj = [];
        var dexBascObj = [];

        _.forEach(kkt, function (value) {
            var keysByCat = _.filter(test, {"CAT": catName, "KEY": value});
            _.forEach(keysByCat, function (value2) {
                if (_.isEqual(value2.DOM, "Dex ESS Premium")) {
                    // console.log('\n FOUND: ' + JSON.stringify(value2.DOM) + ' @ ' + value2.KEY + ' <- ' + value2.SCORE);
                    dexPremObj.push(value2);
                }
                if (_.isEqual(value2.DOM, "Dex ESS Plus")) {
                    // console.log('\n FOUND: ' + JSON.stringify(value2.DOM) + ' @ ' + value2.KEY + ' <- ' + value2.SCORE);
                    dexPluxObj.push(value2);
                }
                if (_.isEqual(value2.DOM, "Dex ESS Basic")) {
                    // console.log('\n FOUND: ' + JSON.stringify(value2.DOM) + ' @ ' + value2.KEY + ' <- ' + value2.SCORE);
                    dexBascObj.push(value2);
                }
            });
        });

        // console.log('@@@@@@@ dexPrem @ ' + JSON.stringify(dexPremObj));
        // console.log('@@@@@@@ dexPlux @ ' + JSON.stringify(dexPluxObj));
        // console.log('@@@@@@@ dexBasc @ ' + JSON.stringify(dexBascObj));

        var tabPrem = {};
        var tabPlux = {};
        var tabBasc = {};

        _.forEach(kkt, function (value) {
            // console.log('XXXXXXXXXXX value @ ' + JSON.stringify(value));
            tabPrem[value] = _.filter(dexPremObj, {"DOM": "Dex ESS Premium", "KEY": value});
            tabPlux[value] = _.filter(dexPluxObj, {"DOM": "Dex ESS Plus", "KEY": value});
            tabBasc[value] = _.filter(dexBascObj, {"DOM": "Dex ESS Basic", "KEY": value});
        });

        this.setState({dexPrem: tabPrem});
        this.setState({dexPlux: tabPlux});
        this.setState({dexBasc: tabBasc});

        var iint = this.getRandomInt(12, 89);
        var pper = _.toString(iint) + ' %';
        this.setState({productPercentage: pper});

        var xint = this.getRandomInt(12, 89);
        var xper = _.toString(xint) + ' %';
        this.setState({domainPercentage: xper});

    }

    _domainData() {



        var tempTotal1 = this.getRandomInt(2, 15);

        if (tempTotal1 >= 1) {
            for (var b = 0; b < tempTotal1; b++) {
                this.state.domainBars.push(<View
                    style={{height:140, width:15, margin:0, backgroundColor:'rgba(0,0,0,0.0)', alignItems:'flex-start' }}
                    key={b}>
                    <Svg height="140" width="15">
                        <Rect
                            x="0"
                            y="0"
                            width="15"
                            height="140"
                            stroke="rgba(0,0,0,1.0)"
                            strokeWidth="5"
                            fill="rgba(0,0,0,0.0)"
                        />
                    </Svg></View>);
            }
        }

        this.state.domainTotal = this.state.domainTotal + _.toInteger(tempTotal1);
        tempTotal1 = 0;


        var tempTotal2 = this.getRandomInt(6, 20);

        if (tempTotal2 >= 1) {
            for (var r = 0; r < tempTotal2; r++) {
                this.state.productBars.push(<View
                    style={{height:140, width:15, margin:0, backgroundColor:'rgba(0,0,0,0.0)', alignItems:'flex-start' }}
                    key={r}>
                    <Svg height="140" width="15">
                        <Rect
                            x="0"
                            y="0"
                            width="15"
                            height="140"
                            stroke="rgba(0,0,0,1.0)"
                            strokeWidth="5"
                            fill="rgba(0,0,0,0.0)"
                        />
                    </Svg></View>);
            }
        }

        this.state.productTotal = this.state.productTotal + _.toInteger(tempTotal2);
        tempTotal2 = 0;

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _renderPicker() {
        this.state.categoriesArr.map((item, index) => {
                var itemString = JSON.stringify(item);
                return ( <Picker.Item label={itemString} value={itemString} key={index}/> )
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
            console.log('this.state.marketInputText : ' + stringify(this.state.selectedCategory, {
                    maxLength: 0,
                    indent: '\t'
                }));
        }


    }

    _confirmGlobalsOnLoad() {
        var confirmGlobMsg = '@@ confirmGlobals || \n ';

        var markVal = _.toString(this.state.marketInputText);
        var domVal = _.toString(this.state.domainInputText);
        var catVal = _.toString(this.state.selectedCategory);
        var rawArrVal = _.toString(this.state.rawArr);

        var globLoc = _.toString(this.props.navigation.selectedNavMarket);
        var globDom = _.toString(this.props.navigation.selectedNavDomain);
        var globCat = _.toString(this.props.navigation.selectedNavCategory);

        if(_.isEmpty(this.props.navigation.dexNavPrem)){ this._reportEmptyObj('this.props.navigation.dexNavPrem') }
        if(_.isEmpty(this.props.navigation.dexNavPlux)){ this._reportEmptyObj('this.props.navigation.dexNavPlux') }
        if(_.isEmpty(this.props.navigation.dexNavBasc)){ this._reportEmptyObj('this.props.navigation.dexNavBasc') }
        if(_.isEmpty(this.props.navigation.rawLocaleNavData)){ this._reportEmptyObj('this.props.navigation.rawLocaleNavData') }

        if(_.isEmpty(this.props.navigation.masterCatKeyArray)){ this._reportEmptyObj('this.props.navigation.masterCatKeyArray'); }
        if(_.isEmpty(this.props.navigation.masterNavCatArray)){ this._reportEmptyObj('this.props.navigation.masterNavCatArray'); }
        if(_.isEmpty(this.props.navigation.masterSumDomCoverage)){ this._reportEmptyObj('this.props.navigation.masterSumDomCoverage'); }
        if(_.isEmpty(this.props.navigation.masterSumProdCoverage)){ this._reportEmptyObj('this.props.navigation.masterSumProdCoverage'); }
        if(_.isEmpty(this.props.navigation.masterDomainScoreObjects)){ this._reportEmptyObj('this.props.navigation.masterDomainScoreObjects'); }


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

    _updateCategoryArray(){
        var catKey = [];
        catKey = this.props.navigation.masterNavCatArray;
        // console.log('\n masterCatKeyArray \n'+stringify(catKey, {maxLength: 0, indent: '\t'}));
        var happy = [];

        _.forEach(catKey, function(item){
            var catName = item.CAT;
            var catID = item.CID;
            happy.push({name: catName, value: catName, cid : catID, icon: '',});

        });
        this.state.categoriesArr = happy;
        this.state.categoriesArr.sort();

        // console.log('\n categoriesArr \n'+JSON.stringify(this.state.categoriesArr));
    }

    componentWillMount() {

        console.log('\n ========== \n ========== \n  PERFORMANCE WILL MOUNT \n ========== \n ========== \n  ');

        var go = false;
        go = this._confirmGlobalsOnLoad();
        if (go) {
            this._updateCategoryArray();
            this._domainData();
            this._updateGrids(this.state.selectedCategory);
        }

    }

    componentDidMount() {
        this._resetGridColumnTotal();
    }
    render() {
        var gridRowTotal = 0;
        var gridCol1Total = 0;
        var gridCol2Total = 0;

        const options = this.state.categoriesArr;

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

                <Content styel={{flex: 1, flexDirection: 'column', justifyContent:'flex-start',}}
                         scrollEnabled={ false }>
                    <Image
                        style={styles.stretch}
                        source={require('./proto.back.png')}
                        resizeMode={Image.resizeMode.stretch}
                    >
                        <View
                            style={{  height:666, flexDirection: 'column', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,1.0)'}}>
                            <View
                                style={{height:null,  flex:1, flexDirection:'row', justifyContent:'flex-start', marginLeft:0,
                                backgroundColor: 'rgba(0,0,0,0.0)',  }}>
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
                                style={{ height:60, paddingTop:8, flexDirection: 'column',overflow:'hidden', justifyContent: 'flex-start',
                                marginTop:0 , backgroundColor : 'rgba(0,0,0,0.0)'}}>
                                <Text
                                    style={{flex:1, width:800, height:60, flexDirection: 'row', textAlign: 'center' , color:'#ABABAB',
                                    fontSize: 30, lineHeight:31, textAlignVertical: 'bottom', }}
                                    ellipsizeMode={'tail'} numberOfLines={1}>
                                    Top30 Terms for {this.state.selectedCategory} in {this.state.selectedCity}
                                </Text>
                            </View>
                            <View
                                style={{ height:32,  flexDirection:'row', justifyContent:'flex-start', backgroundColor: 'rgba(0,0,0,0)', marginLeft:5 }}>
                                <View
                                    style={{ width:180, height:32, overflow: 'hidden',
                                    borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', marginRight:5, justifyContent:'center'}}>
                                    <Text
                                        style={{ color:'#FFFFFF', fontSize: 24, lineHeight:28, fontWeight:'normal',textAlign:'center'  }}>
                                        Coverage</Text>
                                </View>
                                <View
                                    style={{ width:540, height:32, backgroundColor: 'rgba(0,0,0,0)',
                            overflow:'hidden',flexDirection:'row'   }}>
                                    <View
                                        style={{ width:250, height:32, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text
                                            style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'    }}
                                            ellipsizeMode={'tail'} numberOfLines={1}>
                                            Domain</Text>
                                    </View>
                                    <View
                                        style={{ width:330, height:32, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text
                                            style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'   }}
                                            ellipsizeMode={'tail'} numberOfLines={1}>
                                            Google Page 1</Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{opacity:1.0, height:400, marginTop:5,  flexDirection:'row', overflow: 'hidden', justifyContent:'flex-start',
                                backgroundColor: 'rgba(0,0,0,1.0)', marginLeft:5 }}>
                                <View
                                    style={{ flexDirection:'column', overflow: 'hidden',width:180, height:400, overflow: 'hidden', borderRadius:0, backgroundColor: 'rgba(0,0,0,0)', marginRight:5}}>

                                    <Grid style={{ flex:1 }}>
                                        <Row
                                            style={{ backgroundColor: '#000000', height: 140, marginBottom: 6,  justifyContent:'center' }}>
                                            <View
                                                style={{ paddingTop:30, paddingLeft: 3, height:140,  width:180, backgroundColor: "rgba(0,0,254,1.0)", borderRadius: 12,  justifyContent:'center' }}>
                                                <Text
                                                    style={{ textAlignVertical: 'center', fontWeight:'bold',height:70,  width:180, color: "#FFFFFF",
                                                    fontSize: 61, lineHeight:62, textAlign: 'center' , }}
                                                    ellipsizeMode={'tail'} numberOfLines={1}>
                                                    {this.state.domainPercentage}
                                                </Text>
                                            </View>
                                        </Row>
                                        <Row
                                            style={{ backgroundColor: '#000000', height: 140, marginBottom: 0,  justifyContent:'center' }}>
                                            <View
                                                style={{ paddingTop:30, paddingLeft: 3, height:140,  width:180, backgroundColor: "rgba(0,254,0,1.0)", borderRadius: 12, justifyContent:'center' }}>
                                                <Text
                                                    style={{ textAlignVertical: 'center', fontWeight:'bold',height:70,  width:180, color: "#FFFFFF",
                                                    fontSize: 61, lineHeight:62, textAlign: 'center' , }}
                                                    ellipsizeMode={'tail'} numberOfLines={1}>
                                                    {this.state.productPercentage}
                                                </Text>
                                            </View>
                                        </Row>
                                    </Grid>

                                </View>
                                <View
                                    style={{ width:550, height:300, backgroundColor: 'rgba(0,0,0,0.0)',
                            overflow:'hidden',flexDirection:'row'   }}>
                                    <View
                                        style={{ width:250, height:300, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#000', padding:0, marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            <Row
                                                style={{ backgroundColor: '#000000', height: 140, marginBottom: 6,  justifyContent:'center' }}>
                                                <View
                                                    style={{ paddingTop:30, paddingLeft: 3, height:140,  width:250, backgroundColor: "rgba(0,0,0,1.0)",  justifyContent:'center' }}>
                                                    <Text style={{ textAlignVertical: 'center', fontWeight:'bold',height:70,  width:250, color: "#FFFFFF",
                                                    fontSize: 21, lineHeight:22, textAlign: 'center' , }}
                                                          ellipsizeMode={'tail'} numberOfLines={1}>
                                                        {this.state.domainName}
                                                    </Text>
                                                </View>
                                            </Row>
                                            <Row
                                                style={{ backgroundColor: '#000000', height: 140, marginBottom: 0,  justifyContent:'center' }}>
                                                <View
                                                    style={{ paddingTop:30, paddingLeft: 3, height:140,  width:250, backgroundColor: "rgba(0,0,0,1.0)",  justifyContent:'center' }}>
                                                    <Text style={{ textAlignVertical: 'center', fontWeight:'bold',height:70,  width:250, color: "#FFFFFF",
                                                    fontSize: 21, lineHeight:22, textAlign: 'center' , }}
                                                          ellipsizeMode={'tail'} numberOfLines={1}>
                                                        {this.state.productName}
                                                    </Text>
                                                </View>
                                            </Row>
                                        </Grid>


                                    </View>
                                    <View
                                        style={{ width:330, height:300, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#0000', padding:0, marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            <Row
                                                style={{ backgroundColor: '#000000', height: 140, marginBottom: 6,  justifyContent:'flex-start' }}>
                                                <View
                                                    style={{ paddingTop:0, paddingLeft: 0, height:140,  width:null, backgroundColor: "#FFF",  justifyContent:'flex-start' }}>
                                                    <LinearGradient colors={['#9F1B25', '#FFF404','#009F1F']}
                                                                    start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
                                                                    style={styles.linearGradient}>
                                                        <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'flex-start',
                                                                     marginTop:0
                                                                    }}>{ this.state.domainBars }</View>
                                                    </LinearGradient>
                                                </View>
                                            </Row>
                                            <Row
                                                style={{ backgroundColor: '#000000', height: 140, marginBottom: 0,  justifyContent:'flex-start' }}>
                                                <View
                                                    style={{ paddingTop:0, paddingLeft: 0, height:140,  width:null, backgroundColor: "#FFF",  justifyContent:'flex-start' }}>
                                                    <LinearGradient colors={['#9F1B25', '#FFF404','#009F1F']}
                                                                    start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: 0.5}}
                                                                    style={styles.linearGradient}>
                                                        <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'flex-start',
                                                                     marginTop:0
                                                                    }}>{ this.state.productBars }</View>
                                                    </LinearGradient>
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

    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

//     selectedNavDomain : state.selectedNavDomain,
//     selectedNavCategory : state.selectedNavCategory,
//     dexNavPrem: state.dexNavPrem,
//     dexNavPlux: state.dexNavPlux,
//     dexNavBasc: state.dexNavBasc,

export default connect(mapStateToProps, bindAction)(NHButton);
