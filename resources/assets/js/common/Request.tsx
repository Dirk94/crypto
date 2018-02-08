import axios from 'axios';
import Auth from './Auth';

export default class Request
{
    static get(url: string)
    {
        return new Promise((resolve: any, reject: any) => {
            axios.get(url, { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response: any) => {
                    const freshToken = response.headers['x-fresh-token']
                    if (freshToken) {
                        Auth.login(freshToken);
                    }

                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    static post(url: string, data = {})
    {
        return new Promise((resolve: any, reject: any) => {
            axios.post(url, data, { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response: any) => {
                    const freshToken = response.headers['x-fresh-token']
                    if (freshToken) {
                        Auth.login(freshToken);
                    }

                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }
}
