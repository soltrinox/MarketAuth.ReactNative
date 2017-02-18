import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {
    Container, Header, Title, Content, Text, H3, Button, Icon,
    Image, Footer, FooterTab, StyleSheet,
    // ScrollView,
    View,
    TextInput,
    // AppRegistry,
    TouchableOpacity,
    Dimensions
} from 'native-base';

// import {ScrollView} from 'native-base';

import {openDrawer} from '../../actions/drawer';

import {Col, Row, Grid} from 'react-native-easy-grid'
import DeviceInfo from 'react-native-device-info'
import {Carousel} from 'react-native-snap-carousel'
// import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager'
// import Svg from 'react-native-svg'
import Svg, {G, Rect, Symbol, Use, Defs, Stop} from 'react-native-svg'
// import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';
import Picker from 'react-native-picker'


import sliderStyles from './Slider.style'
import sliderWidth from './SliderEntry.style'
import itemWidth from './SliderEntry.style'
import sliderEntryStyles from './SliderEntry.style'

import myTheme from '../../themes/base-theme';
import styles from './styles';


class Anatomy extends React.Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
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
            selectedCategory: 'keywords',
            selectedState: 'CA',
            selectedCity: 'San Francisco',
            selectedDomainTotal: 2,
            columnTotal1: 0,
            columnTotal2: 0,
            columnTotal3: 0,
            columnTotal4: 0,
            columnTotal5: 0,
            columnTotal6: 0,
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
            car1: Carousel,
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
        this._updateText = this._updateText.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._updateCarousels = this._updateCarousels.bind(this);
        this._productCarouselChange2 = this._productCarouselChange2.bind(this);
        this._productCarouselChange3 = this._productCarouselChange3.bind(this);
    }

    _getUsers() {
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

    _updateCarousels(carInstance, itemPos) {

        console.log('@@@@@ Change ON ' + carInstance + ' POS: ' + itemPos);
        if (carInstance === 'CAR1') {

        }
    }

    _productCarouselChange2(carInstance, itemPos) {

        if (this._myCarousel3.currentIndex === itemPos) {
            console.log('@@@@@ NO Change ON ' + carInstance + ' POS: ' + itemPos + ' @' + this._myCarousel2.currentIndex);
        } else {
            if (this._myCarousel3.currentIndex === this._myCarousel2.currentIndex) {
                console.log('INDEX MATCH ');
            } else {
                this._myCarousel3.snapToItem(this._myCarousel2.currentIndex);
            }
        }
    }

    _productCarouselChange3(carInstance, itemPos) {

        if (this._myCarousel2.currentIndex === itemPos) {
            console.log('@@@@@ NO Change ON ' + carInstance + ' POS: ' + itemPos + ' @' + this._myCarousel3.currentIndex);
        } else {
            if (this._myCarousel2.currentIndex === this._myCarousel3.currentIndex) {
                console.log('INDEX MATCH ');
            } else {
                this._myCarousel2.snapToItem(this._myCarousel3.currentIndex);
            }
        }
    }


    _renderItem(entry) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={sliderEntryStyles.slideInnerContainer}
            >{entry}</TouchableOpacity>
        );
    }


    _domainData() {
        var testJSON = require('./LAS.001.json');
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
        this.state.categoriesArr = this.state.categoriesArr.slice(80, 95);

        this.state.keywordArr = [...new Set(test.map(item => item.KEY))];
        this.state.keywordArr.sort();

        this.state.keywordArr = this.state.keywordArr.slice(200, 215);

        var happy = [];
        // console.log('@@@@@@@@@@@@@@ ORDERBY JSON: '+  JSON.stringify(test));

        for (var j = 0; j < this.state.categoriesArr.length; j++) {
            var trr = [];
            var catName = _.toString(this.state.categoriesArr[j]);
            trr = _.filter(test, {"CAT": catName});
            // console.log('%%%%%%%%%%% SORTED KEYWORDS ON '+ catName +': '+  JSON.stringify(trr));
            var upp = '{' + catName + ' : ' + JSON.stringify(trr) + '}';
            console.log('########### SORTED ARRAY ON ' + catName + ': ' + JSON.stringify(upp));
            _.set(this.state.dataObjects, catName, trr);
        }
        return this.state.dataObjects;
    }


    componentWillMount() {

        this.state.userData = {'key': 'val', 'key': 'val'};
        fetch("https://www.randomuser.me/api/1.1?nat=us")
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('responseData :' + JSON.stringify(responseData.results));
                this.setState({userData: responseData.results});
                console.log('AFTER USER DATA: ' + JSON.stringify(this.state.userData));
            })
            .done();


        var doamins = [];
        domains = this._domainData();
        // NOW THAT THE ARRAYS ARE POPULATED LEST LOOK INSIDE


        console.log("Test Model", DeviceInfo.getModel());
        console.log("Device ID", DeviceInfo.getDeviceId());
        console.log("System Name", DeviceInfo.getSystemName());


        var clientDomains = ['www.default.com', 'www.generic.com'];
        var keywordsClients = [
            ['keyword1', '0', '1'],
            ['keyword2', '2', '2'],
            ['keyword3', '0', '1'],
            ['keyword4', '1', '2'],
            ['keyword5', '2', '0'],
            ['keyword6', '1', '1'],
            ['keyword7', '0', '3'],
            ['keyword8', '1', '0'],
            ['keyword9', '0', '1'],
            ['keyword10', '0', '2'],
        ];

        var products = ['DEX BASIC', 'DEX PLUS', 'DEX PRO', 'DEX PREMIUM'];
        var keywordsProducts = [
            ['keyword1', '5', '2', '7', '9'],
            ['keyword2', '6', '5', '9', '12'],
            ['keyword3', '1', '7', '6', '10'],
            ['keyword4', '8', '7', '8', '9'],
            ['keyword5', '10', '10', '10', '10'],
            ['keyword6', '5', '4', '8', '11'],
            ['keyword7', '9', '8', '5', '9'],
            ['keyword8', '3', '5', '9', '12'],
            ['keyword9', '4', '1', '6', '9'],
            ['keyword10', '8', '9', '11', '11'],
        ];
        this.state.productDomains = products.length;

        var productColumnArray = [];

        // this._updateKeywordsArray(keywordsProducts);

        console.log('@@@@@@@@@@@@@@ categoriesArr : ' + JSON.stringify(this.state.categoriesArr));
        console.log('@@@@@@@@@@@@@@ keywordArr : ' + JSON.stringify(this.state.keywordArr));
        console.log('88888888 SORTED KEYWORDS ON : ' + JSON.stringify(this.state.dataObjects));


        // CREATE THE GRIDS FOR EACH CAROUSEL COLUMN


        this.setState({car1: this.example1});

    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
            tab4: false,
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
            tab4: false,
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
            tab4: false,
        });
    }

    toggleTab4() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: false,
            tab4: true,
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    render() {

        // var tty = this.state.userData[0];
        // var pic = JSON.parse(tty);

        // console.log('this.state.clientColumnItems : '+JSON.stringify(this.state.clientColumnItems));


        return (
            <Container theme={myTheme} style={{ width : 800, backgroundColor: '#000000'}}>

                <Header style={{ width : 800, backgroundColor: '#000000'}} >
                    <Title style={{ width : 800, backgroundColor: '#000000', color: '#FFF'}}>GOOGLE PAGE ONE SEO </Title>

                </Header>

                <Content padder style={{ width : 800}}>
                    {/*<H3>This is content section</H3>*/}
                    <View style={{ flex:1, marginTop:20 }}>
                        <Text style={{flex:1, flexDirection: 'row', textAlign: 'center' ,
               color:'#ABABAB', margin:10, fontSize: 18 }}>
                            keywords for <Text
                            style={{ color:'#ff00ff', fontSize: 22, fontWeight:'700'  }}>{this.state.dropdownSelection}</Text>
                            @ <Text style={{ color:'#0000FF', fontSize: 22, fontWeight:'bold'  }}>
                            {this.state.selectedDomain}</Text>
                        </Text>
                    </View>

                    <View style={{ flex:1, flexDirection:'row', alignItems:'flex-start',
            marginTop:20, backgroundColor: 'rgba(0,0,0,0)', }}>
                        <View
                            style={{ width:300, height:400, overflow: 'hidden', borderRadius:0, backgroundColor: '#00000000', paddingLeft:10}}>

                            <Grid style={{ flex:1 }}>
                                {
                                    this.state.keywordArr.map((item, index) => {
                                            var itemString = JSON.stringify(item);
                                            return (
                                                <Row style={{ backgroundColor: '#00000000', height: 25 }} key={index}>
                                                    <View key={index}
                                                          style={{  height:30,  width:300,
                                                    backgroundColor: "rgba(0,0,0,0)",
                                                }}>
                                                        <Text
                                                            style={{ height:30,  width:300,
                                                    color: "#FFFFFF",
                                                    fontSize: 14,
                                                }}>{index} ]
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
                            style={{ width:400, height:400, backgroundColor: 'rgba(0,0,0,0)', overflow:'hidden',flexDirection:'row'   }}>

                            <View
                                style={{ width:200, height:400, overflow: 'hidden', borderRadius:0, backgroundColor: 'rgba(0,0,0,0)', padding:0 }}
                            >
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
                                                    <Row style={{ backgroundColor: '#00000000', height: 25 }} key={index}>
                                                        <View key={index}
                                                              style={{  height:30,  width:200,
                                                                backgroundColor: "rgba(0,0,0,1)",
                                                            }}>

                                                            <View style={{
                                                                flex: 1,
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-start',
                                                                }}>
                                                                { kray }
                                                            </View>
                                                        </View>
                                                    </Row>
                                                )
                                            }
                                        )
                                    }
                                    <Row style={{ backgroundColor: '#00000000', height: 25 }} key={99}>
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
                                style={{ width:200, height:400, overflow: 'hidden', borderRadius:0, backgroundColor: 'rgba(0,0,0,0)', padding:0 }}
                            >
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
                                                    <Row style={{ backgroundColor: '#00000000', height: 25 }}
                                                         key={index}>
                                                        <View key={index}
                                                              style={{  height:30,  width:200,
                                                                backgroundColor: "rgba(0,0,0,1)",
                                                            }}>

                                                            <View style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'flex-start',
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


                </Content>

                {/*<Footer >*/}
                {/*<FooterTab>*/}
                {/*<Button active={this.state.tab1} onPress={() => this.toggleTab1()} >*/}
                {/*Apps*/}
                {/*<Icon name="ios-apps-outline" />*/}
                {/*</Button>*/}
                {/*<Button active={this.state.tab2} onPress={() => this.toggleTab2()} >*/}
                {/*Camera*/}
                {/*<Icon name="ios-camera-outline" />*/}
                {/*</Button>*/}
                {/*<Button active={this.state.tab3} onPress={() => this.toggleTab3()} >*/}
                {/*Navigate*/}
                {/*<Icon name="ios-compass" />*/}
                {/*</Button>*/}
                {/*<Button active={this.state.tab4} onPress={() => this.toggleTab4()} >*/}
                {/*Contact*/}
                {/*<Icon name="ios-contact-outline" />*/}
                {/*</Button>*/}
                {/*</FooterTab>*/}
                {/*</Footer>*/}
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

export default connect(mapStateToProps, bindAction)(Anatomy);
