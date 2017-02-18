import RestClient from 'react-native-rest-client';

export default class YourRestApi extends RestClient {
    constructor () {
        // Initialize with your base URL
        super('https://randomuser.me');
    }
    // Now you can write your own methods easily
    randomUser ( nat) {
        // Returns a Promise with the response.
        // return this.POST('/auth', { username, password });
        return this.GET('/api/1.1',{ nat })
            .then(response =>  response);
    }
};