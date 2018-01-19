import axios from 'axios';
import Auth from './auth/Auth.jsx';

export default class Request {

    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url, { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response) => {
                    let data = response.data;
                    if (data.new_token) {
                        Auth.authenticateUser(data.new_token);
                    }

                    resolve(response);
                })
                .catch((error) => {
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
                    let data = response.data;
                    if (data.new_token) {
                        Auth.authenticateUser(data.new_token);
                    }

                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
