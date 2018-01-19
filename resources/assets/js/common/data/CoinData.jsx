import Auth from "../auth/Auth.jsx";
import Request from "../Request.jsx";

/**
 * This class contains all the Coin Data that is used for the CoinData input fields.
 * This makes sure that the Coin Data is loaded at most 1 time.
 */
export default class CoinData {

    static getCoinData() {
        return new Promise((resolve, reject) => {
            let coins = localStorage.getItem('coindata');

            if (coins !== null) {
                return resolve(JSON.parse(coins));
            }

            Request.get('/api/coins')
                .then((response) => {
                    let coins = response.data;
                    localStorage.setItem('coindata', JSON.stringify(coins));
                    return resolve(coins);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }
}
