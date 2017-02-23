var RNDBModel = require('react-native-db-models')

var DB = {
    "app": new RNDBModel.create_db('app'),
    "users": new RNDBModel.create_db('users'),
    "markets": new RNDBModel.create_db('markets'),
    "settings": new RNDBModel.create_db('settings'),
}

module.exports = DB