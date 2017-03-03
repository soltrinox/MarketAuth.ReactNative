var RNDBModel = require('react-native-db-models')

var DB = {
    "app": new RNDBModel.create_db('app'),
    "users": new RNDBModel.create_db('users'),
    "cats": new RNDBModel.create_db('cats'),
    "keywords": new RNDBModel.create_db('keywords'),
    "markets": new RNDBModel.create_db('markets'),
    "domains": new RNDBModel.create_db('domains'),
    "settings": new RNDBModel.create_db('settings'),
}

module.exports = DB