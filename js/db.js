var RNDBModel = require('react-native-db-models');

var DB = {
    "app": new RNDBModel.create_db('app'),
    "users": new RNDBModel.create_db('users'),
    "cats": new RNDBModel.create_db('cats'),
    "settings": new RNDBModel.create_db('settings'),
    "dexPrem": new RNDBModel.create_db('dexPrem'),
    "dexPlux": new RNDBModel.create_db('dexPlux'),
    "dexBasc": new RNDBModel.create_db('dexBasc'),
    "keywords": new RNDBModel.create_db('keywords'),
    "markets": new RNDBModel.create_db('markets'),
    "domains": new RNDBModel.create_db('domains'),
};

module.exports = DB;