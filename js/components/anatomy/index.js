import React, {Component} from 'react';
import {ScrollView, AppRegistry, View, Image} from 'react-native';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import Picker from 'native-base';
import {
    Container, Header, Title, Content, Text, H3, Button, Icon,
    Footer, FooterTab, StyleSheet,
    InputGroup,
    TextInput,
    Input,
    TouchableOpacity,
    Dimensions
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


var DBEvents = require('react-native-db-models').DBEvents;
var DB = require('../../db.js');

DBEvents.on("all", function () {
    console.log("Database changed");
});

class Anatomy extends React.Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        selectCategory: React.PropTypes.func,
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
            userData: {},
            usersArry: [],
            selectedDomain: 'www.default.com',
            selectedCategory: 'ARCHITECTS',
            selectedItem: undefined,

            results: {
                items: []
            },
            selectedState: 'CA',
            selectedCity: 'PHOENIX, AZ',
            selectedDomainTotal: 2,
            columnTotal1: 0,
            columnTotal2: 0,
            columnTotal3: 0,
            columnTotal4: 0,
            columnTotal5: 0,
            columnTotal6: 0,

            dexPrem : [],
            dexPlus : [],
            dexBasc: [],

            domain1: 'test 1',
            domain2: 'test 1',
            domain3: 'test 1',
            productDomains: 4,
            clientColumnItems: [],
            domainItems2: [],
            domainItems3: [],
            keywordGridColumns: [],
            domainGridColumns: [],
            carouselPosition2: 0,
            carouselPosition3: 0,
            car1: {},
            car2: {},
            car3: {},
            message: 'Try clicking the top-right menus',
            firstMenuDisabled: false,
            dropdownSelection: '   CATEGORY   ',
            dataObjects: {},
            rawArr: [],
            categoriesArr: [],
            keywordArr: []
        };

        this._getUsers = this._getUsers.bind(this);
        //this._renderModalPicker = this._renderModalPicker.bind(this);
        this._updateText = this._updateText.bind(this);

        // this._returnDataOnSelection = this._returnDataOnSelection.bind(this);
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

        console.log('2222222 USER DATA: ' + JSON.stringify(this.state.userData));
    }

    _updateText(ddomain) {
        this.setState({selectedDomain: ddomain});
    }

    _updateClientColumn(items) {
        this.setState({clientColumnItems: items});
    }

    _updateKeywords(arrayz) {
        this.setState({keywordGridColumns: arrayz});
    }

    _updateDomainColumns(arrayz) {
        this.setState({domainGridColumns: arrayz});
    }

    _addDexPrem(catt , newObj){
        var ttd = this.state.selectedCategory;
        DB.dexPrem.add( { tdd : newObj} , function (added_data) {
            console.log('dexPrem added_data' + JSON.stringify(added_data));
        });
        DB.dexPrem.get_all(function(result){
            console.log('$$$$$$ get_all dexPrem: '+ JSON.stringify(result) );
        });
    }

    _addDexPlus(catt , newObj ){
        var ttd = this.state.selectedCategory;
        DB.dexPlus.add( {tdd : newObj}  , function (added_data) {
            console.log('dexPlus added_data' + JSON.stringify(added_data));
        });
        DB.dexPlus.get_all(function(result){
            console.log('$$$$$$ get_all dexPlus: '+ JSON.stringify(result) );
        });
    }

    _addDexBasc( catt , newObj ){
        var ttd = this.state.selectedCategory;
        DB.dexBasc.add( {tdd : newObj}  , function (added_data) {
            console.log('dexBasc added_data' + JSON.stringify(added_data));
        });
        DB.dexBasc.get_all(function(result){
            console.log('$$$$$$ get_all dexBasc: '+ JSON.stringify(result) );
        });
    }

    _returnDataOnSelection(item, e) {



        this.setState({ columnTotal1 : 0} );
        this.setState({ columnTotal2 : 0} );
        this.setState({ columnTotal3 : 0} );
        this.setState({ columnTotal4 : 0} );



        console.log('SELECT CAT NAME : ' + JSON.stringify(e));
        this.setState({selectedCategory: e.value});
        var test = _.orderBy(this.state.rawArr, ['CAT', 'KEY', 'SCORE'], ['asc', 'asc', 'desc']);
        var trr = [];
        var catName = e.value;
        trr = _.filter(test, {"CAT": catName});
        var upp = {catName: trr};
        var kkt = [];
        kkt = [...new Set(trr.map(item => item.KEY))];
        kkt.sort();
        this.setState({keywordArr: kkt});
        this.setState({dataObjects: upp});

        // console.log('########### DOMAINS BY KEY ON : ' + JSON.stringify(kkt));
        var resultXXX = _.filter(test, function (p) {
            return _.includes(kkt, p.KEY);
        });

        var testDomains = _.orderBy(resultXXX, ['KEY', 'SCORE'], ['asc', 'desc']);
        // console.log('########### MATCHED DOMAINS BY KEY : ' + JSON.stringify(testDomains));

           var dexPremObj = [];
           var dexPlusObj = [];
           var dexBascObj = [];

        _.forEach(kkt, function(value) {
            var keysByCat = [];
            keysByCat = _.filter(test, {"CAT": catName, "KEY": value });
            _.forEach(keysByCat, function(value) {
                var value2 = value;
                 // console.log('\n\n===============\n\n DOM: ' + JSON.stringify(value.DOM) );
                if(_.isEqual(value2.DOM , "Dex ESS Premium")){
                    console.log('\n\n===============\n\n FOUND: ' + JSON.stringify(value2.DOM) + ' @ ' + value2.KEY+ ' <- ' + value2.SCORE  );
                    dexPremObj.push(value2);
                }
                if(_.isEqual(value2.DOM , "Dex ESS Plus")) {
                    console.log('\n\n===============\n\n FOUND: ' + JSON.stringify(value2.DOM)+ ' @ ' + value2.KEY+ ' <- ' + value2.SCORE  );
                    dexPlusObj.push(value2);
                }
                if(_.isEqual(value2.DOM , "Dex ESS Basic")) {
                    console.log('\n\n===============\n\n FOUND: ' + JSON.stringify(value2.DOM)+ ' @ ' + value2.KEY+ ' <- ' + value2.SCORE  );
                    dexBascObj.push(value2);
                }
            });
        });

        this.setState({dexPrem : dexPremObj });
        this.setState({dexPlus : dexPlusObj });
        this.setState({dexBasc : dexBascObj });


        // var ttc = _.toString(this.state.selectedCategory);
        // this._addDexBasc( this.state.selectedCategory, dexBascObj  );
        // this._addDexPlus( this.state.selectedCategory,  dexPlusObj );
        // this._addDexPrem( this.state.selectedCategory, dexPremObj );
        catName = e.value;



        var devPremUpdate = {};
        devPremUpdate[catName] = dexPremObj;
        DB.dexPrem.add(devPremUpdate, function(added_data){
            console.log('dexPrem = '+ JSON.stringify(added_data));
        });

        var devPlusUpdate = {};
        devPlusUpdate[catName] = dexPlusObj;
        DB.dexPlus.add( devPlusUpdate, function(added_data){
            console.log('dexPlus = '+ JSON.stringify(added_data));
        });

        var devBascUpdate = {};
        devBascUpdate[catName] = dexBascObj;
        DB.dexBasc.add( devBascUpdate, function(added_data){
            console.log('dexBasc = '+ JSON.stringify(added_data));
        });

    }



    _addDexObj(nObj){
        DB.domains.add(nObj , function (added_data) {
            console.log('%%%%%% added_data' + JSON.stringify(added_data));
        });
        DB.domains.get_all(function(result){
            console.log('$$$$$$ get_all : '+ JSON.stringify(result) );
        });

    }

    _domainData() {



        var testJSON = require('./PHX.001.json');
        this.state.dataObjects = {
            CATEGORY1: [
                {KEY: 'First Domain', DOM: 'DEX PLUS'},
                {KEY: 'First Domain', DOM: 'DEX PREM'},
                {KEY: 'First Domain', DOM: 'www.xxxxx.com'},
                {KEY: 'First Domain', DOM: 'www.yyyy.com'},
                {KEY: 'First Domain', DOM: 'First Description'},
                {KEY: 'Second Domain', DOM: 'Second Description'},
                {KEY: 'Third Domain', DOM: 'Third Description'},
                {KEY: 'Fourth Domain', DOM: 'Fourth Description'},
                {KEY: 'Fifth Domain', DOM: 'Fifth Description'},
                {KEY: 'Sixth Domain', DOM: 'Sixth Description'},
                {KEY: 'Seventh Domain', DOM: 'Seventh Description'},
                {KEY: 'Eighth Domain', DOM: 'Eighth Description'},
                {KEY: 'Ninth Domain', DOM: 'Ninth Description'},
                {KEY: 'Tenth Domain', DOM: 'Tenth Description'}
            ],
            CATEGORY2: [
                {KEY: 'Eleventh Domain', DOM: 'Eleventh Description'},
                {KEY: '12th Domain', DOM: '12th Description'},
                {KEY: '13th Domain', DOM: '13th Description'},
                {KEY: '14th Domain', DOM: '14th Description'},
                {KEY: '15th Domain', DOM: '15th Description'},
                {KEY: '16th Domain', DOM: '16th Description'},
                {KEY: '17th Domain', DOM: '17th Description'},
                {KEY: '18th Domain', DOM: '18th Description'},
                {KEY: '19th Domain', DOM: '19th Description'},
                {KEY: '20th Domain', DOM: '20th Description'},
                {KEY: 'BLACKJACK!', DOM: 'BLACKJACK! Description'}
            ]
        };
        this.state.rawArr = testJSON;
        var test = _.orderBy(this.state.rawArr, ['CAT', 'KEY', 'SCORE'], ['asc', 'asc', 'desc']);

        this.state.categoriesArr = [...new Set(test.map(item => item.CAT))];
        this.state.categoriesArr.sort();
        this.state.keywordArr = [...new Set(test.map(item => item.KEY))];
        this.state.keywordArr.sort();
        this.state.keywordArr = this.state.keywordArr.slice(700, 710);

        // this._addDexBasc( { cat: 'generic', keysz:  this.state.keywordArr.slice(700, 710) });
        // this._addDexPlus( { cat: 'generic', keysz:  this.state.keywordArr.slice(700, 710) });
        // this._addDexPrem( { cat: 'generic', keysz:  this.state.keywordArr.slice(700, 710) });



        var happy = [];

        for (var j = 0; j < this.state.categoriesArr.length; j++) {
            var trr = [];
            var catName = _.toString(this.state.categoriesArr[j]);
            happy.push({name: catName, value: catName, icon: '',});
            trr = _.filter(test, {"CAT": catName});
            var upp = '{' + catName + ' : ' + JSON.stringify(trr) + '}';
            _.set(this.state.dataObjects, catName, trr);
        }
        this.setState({categoriesArr: happy});
        return this.state.dataObjects;
    }

    _setUserData() {
        // DB.users.add({first_name: "TEST", age: 40}, function (added_data) {
        //     console.log('added_data' + JSON.stringify(added_data));
        // });
    }

    componentWillMount() {

        var domains = [];
        domains = this._domainData();
        // NOW THAT THE ARRAYS ARE POPULATED  LOOK INSIDE




        console.log("Test Model", DeviceInfo.getModel());
        console.log("Device ID", DeviceInfo.getDeviceId());
        console.log("System Name", DeviceInfo.getSystemName());


    }
    componentDidMount(){
        this.setState({ columnTotal1 : 0} );
        this.setState({ columnTotal2 : 0} );
        this.setState({ columnTotal3 : 0} );
        this.setState({ columnTotal4 : 0} );
        // DB.dexBasc.erase_db(function(removed_data){
        //     console.log(removed_data);
        // });
        // DB.dexPlus.erase_db(function(removed_data){
        //     console.log(removed_data);
        // });
        // DB.dexPrem.erase_db(function(removed_data){
        //     console.log(removed_data);
        // });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _renderPicker(){
        this.state.categoriesArr.map((item, index) => {
                var itemString = JSON.stringify(item);
                return ( <Picker.Item label={itemString} value={itemString} key={index} /> )
            }
        )
    }

    render() {

        // var tty = this.state.userData[0];
        // var pic = JSON.parse(tty);
        // console.log('this.state.clientColumnItems : '+JSON.stringify(this.state.clientColumnItems));
        const options = this.state.categoriesArr;

        return (
            <Container theme={myTheme} style={{ width : 800, backgroundColor: '#000000'}}>
                <Header style={{ width : 800, height:100, backgroundColor: '#454545', paddingLeft: 40}}>
                    <View style={{ flex: 1, alignItems : 'flex-start', flexDirection: 'row',}}>
                        <View style={{ width: 220, height: 30, marginRight:20 }}>
                            <InputGroup>
                                <Input label="DOMAIN" placeholder="DOMAIN" style={{ width: 120, height: 30 }}/>
                            </InputGroup>
                        </View>
                        <View style={{ width: 220, height: 30, marginRight:20 }}>
                            <Selection

                                ref={(mySelection1) => { this._mySelection1 = mySelection1; }}
                                title="SELECT CATEGORY"
                                options={options}

                                onSelection={(e) => this._returnDataOnSelection(this,e)}
                                style={{
                                  body: null,
                                  option: null,
                                }}
                                iconSize={20}
                                iconColor="#eee"
                            />

                        </View>
                        <View style={{ width: 220, height: 30, marginRight:20 }}>
                            <InputGroup>
                                <Input label="MARKET" placeholder="MARKET" style={{ width: 120, height: 30 }}/>
                            </InputGroup>
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
                        <View style={{ height:666, flexDirection: 'column', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.85)'}}>
                            <View style={{height:null,  flex:1, flexDirection:'row', justifyContent:'flex-start', marginLeft:0,  backgroundColor: 'rgba(0,0,0,0.0)',  }}>
                                <Text   style={{ marginTop:20, width:400, height:40,overflow:'hidden', color:'#00ff00', lineHeight:38, fontSize: 36, fontWeight:'bold' , paddingLeft:20, textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.5)',  }} ellipsizeMode={'tail'} numberOfLines={1}>
                                    {this.state.selectedCategory}
                                </Text>
                                <Text style={{ marginTop:20, width:400, height:40,overflow:'hidden', color:'#ffffff', lineHeight:38, fontSize: 36, fontWeight:'bold' , paddingRight:20, textAlign: 'right',
                                backgroundColor: 'rgba(0,0,0,0.5)', }} ellipsizeMode={'tail'} numberOfLines={1}>
                                    {this.state.selectedCity}
                                </Text>
                            </View>
                            <View style={{ height:40, paddingTop:8, flexDirection: 'column',overflow:'hidden', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.0)'}}>
                                <Text style={{flex:1, width:800, height:40, flexDirection: 'row', textAlign: 'center' , color:'#ABABAB',  fontSize: 22 }} ellipsizeMode={'tail'} numberOfLines={1}>
                                    Top 10 Searches for   {this.state.selectedCategory}  in  {this.state.selectedCity}
                                </Text>
                            </View>
                            <View style={{ height:62,  flexDirection:'row', justifyContent:'flex-start', backgroundColor: 'rgba(0,0,0,0)', marginLeft:5 }}>
                                <View
                                    style={{ width:300, height:62, overflow: 'hidden',
                                    borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', marginRight:5, justifyContent:'center'}}>
                                    <Text style={{ color:'#FFFFFF', fontSize: 24, lineHeight:28, fontWeight:'normal',textAlign:'center'  }}>
                                        SEARCH TERM</Text>
                                </View>
                                <View
                                    style={{ width:480, height:62, backgroundColor: 'rgba(0,0,0,0)',
                            overflow:'hidden',flexDirection:'row'   }}>
                                    <View
                                        style={{ width:240, height:62, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'    }} ellipsizeMode={'tail'} numberOfLines={1}  >
                                            www.domain.com</Text>
                                    </View>
                                    <View
                                        style={{ width:240, height:62, overflow: 'hidden',
                                borderRadius:0, backgroundColor: 'rgba(66,66,66,0.5)', padding:0,marginLeft:5, justifyContent:'center' }}>
                                        <Text style={{ color:'#FFFFFF', fontSize: 24,lineHeight:28, fontWeight:'normal',textAlign:'center'   }} ellipsizeMode={'tail'} numberOfLines={1}>
                                            DEX PREMIUM</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height:365, marginTop:5,  flexDirection:'row', overflow: 'hidden', justifyContent:'flex-start', backgroundColor: 'rgba(0,0,0,0)', marginLeft:5 }}>
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
                                                                  style={{  height:30,  width:300, backgroundColor: "rgba(0,0,0,0)",  justifyContent:'center' }}>
                                                                <Text style={{ height:30,  width:300, color: "#FFFFFF", fontSize: 14, textAlign: 'center' , }} ellipsizeMode={'tail'} numberOfLines={1} >

                                                                    {item}
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
                                    <View
                                        style={{ width:240, height:495, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#000', padding:0,marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            {

                                                this.state.keywordArr.map((item, index) => {
                                                        var itemString = JSON.stringify(item);

                                                        var kray = [];

                                                        var ggg = this.getRandomInt(2, 12);

                                                        this.state.columnTotal1 = this.state.columnTotal1 + ggg;

                                                        for (var k = 0; k < ggg; k++) {
                                                            kray.push(<Svg height="16" width="17" key={k}>
                                                                <Rect
                                                                    x="0"
                                                                    y="0"
                                                                    width="15"
                                                                    height="15"
                                                                    stroke="black"
                                                                    strokeWidth="1"
                                                                    fill="green"
                                                                />
                                                            </Svg>);

                                                        }


                                                        return (
                                                            <Row
                                                                style={{ backgroundColor: '#454545', height: 30 ,marginBottom: 2 }}
                                                                key={index}>
                                                                <View key={index}
                                                                      style={{  height:30,  width:240,
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
                                                 key={99}>
                                                <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems: 'flex-start',
                                            }}>
                                                    <Text
                                                        style={{color:'#FFFFFF', fontSize: 20, textAlign: 'center'}}> {this.state.columnTotal1 } </Text>
                                                </View>
                                            </Row>
                                        </Grid>
                                    </View>
                                    <View
                                        style={{ width:240, height:495, overflow: 'hidden',
                                borderRadius:0, backgroundColor: '#0000', padding:0, marginLeft:5 }}>
                                        <Grid style={{ flex:1 }}>
                                            {
                                                this.state.keywordArr.map((item, index) => {
                                                        var itemString = JSON.stringify(item);

                                                        var kray = [];

                                                        var ggg = this.getRandomInt(2, 12);
                                                        this.state.columnTotal2 = this.state.columnTotal2 + ggg;

                                                        for (var k = 0; k < ggg; k++) {
                                                            kray.push(<Svg height="16" width="17" key={k}>
                                                                <Rect
                                                                    x="0"
                                                                    y="0"
                                                                    width="15"
                                                                    height="15"
                                                                    stroke="black"
                                                                    strokeWidth="1"
                                                                    fill="green"
                                                                />
                                                            </Svg>);

                                                        }


                                                        return (
                                                            <Row
                                                                style={{ backgroundColor: '#454545', height: 30,marginBottom: 2 }}
                                                                key={index}>
                                                                <View key={index}
                                                                      style={{  height:30,  width:240,
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
                                        </Grid>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height:120, paddingTop:8, flexDirection: 'column', justifyContent: 'flex-start', marginTop:0 , backgroundColor : 'rgba(0,0,0,0.5)'}}>
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
        selectCategory: () => dispatch(selectCategory()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Anatomy);
