import Auth from "../auth/Auth.jsx";
import axios from 'axios';

/**
 * This class contains all the Coin Data that is used for the CoinData input fields.
 * This makes sure that the Coin Data is loaded at most 1 time.
 */
export default class CoinData {
    static getCoinData() {
        return new Promise((resolve, reject) => {
            let coins = localStorage.getItem('coindata');

            if (coins !== null) {
                console.log("No API request");
                return resolve(JSON.parse(coins));
            }

            console.log("API request");
            axios.get('/api/coins', { headers: {
                'Authorization': Auth.getToken()
            }})
                .then((response) => {
                    let coins = response.data;
                    localStorage.setItem('coindata', JSON.stringify(coins));
                    return resolve(coins);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
    }

}