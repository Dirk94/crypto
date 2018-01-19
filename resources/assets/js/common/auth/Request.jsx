import axios from 'axios';
import Auth from './Auth.jsx';

export default class Request {

    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url, { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response) => {
                    console.log("(GET) MIDDLE WARE RESPONSE YAY");
                    console.log(response);
                    console.log('');

                    resolve(response);
                })
                .catch((error) => {
                    console.log("(GET) MIDDLE WARE ERROR YAY");
                    console.log(error);
                    console.log('');

                    reject(error);
                });
        });
    }

    static post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response) => {
                    console.log("(POST) MIDDLE WARE RESPONSE YAY");
                    console.log(response);
                    console.log('');

                    resolve(response);
                })
                .catch((error) => {
                    console.log("(POST) MIDDLE WARE ERROR YAY");
                    console.log(error);
                    console.log('');

                    reject(error);
                });
        });
    }
}
