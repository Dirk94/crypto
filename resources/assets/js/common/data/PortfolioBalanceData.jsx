import Request from "../Request.jsx";
import moment from 'moment';

export default class PortfolioBalanceData {

    static KEY_MINUTE_DATA = 'portfolioBalanceMinuteData';
    static KEY_MINUTE_DATA_TIMESTAMP = 'portfolioBalanceMinuteDataTimestamp';

    static KEY_BALANCE = 'portfolioBalance';
    static KEY_BALANCE_TIMESTAMP = 'portfolioBalanceTimestamp';

    static DATA_EXPIRE_TIME = 1; // in minutes

    static getMinuteData() {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem(PortfolioBalanceData.KEY_MINUTE_DATA);
            let timestamp = localStorage.getItem(PortfolioBalanceData.KEY_MINUTE_DATA_TIMESTAMP);

            let now = moment();
            let momentTimestamp = moment(timestamp, 'x');
            const diffInMinutes = now.diff(momentTimestamp) / 1000 / 60;

            if (data !== null && diffInMinutes < PortfolioBalanceData.DATA_EXPIRE_TIME) {
                const parsedData = JSON.parse(data);
                return resolve(parsedData);
            }

            Request.get('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/history/minutes')
                .then((response) => {
                    localStorage.setItem(PortfolioBalanceData.KEY_MINUTE_DATA, JSON.stringify(response.data));
                    localStorage.setItem(PortfolioBalanceData.KEY_MINUTE_DATA_TIMESTAMP, moment().format('x'));

                    return resolve(response.data);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
    }

    static getBalance() {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem(PortfolioBalanceData.KEY_BALANCE);
            let timestamp = localStorage.getItem(PortfolioBalanceData.KEY_BALANCE_TIMESTAMP);

            let now = moment();
            let momentTimestamp = moment(timestamp, 'x');
            const diffInMinutes = now.diff(momentTimestamp) / 1000 / 60;

            if (data !== null && diffInMinutes < PortfolioBalanceData.DATA_EXPIRE_TIME) {
                const parsedData = JSON.parse(data);

                return resolve(parsedData);
            }

            Request.get('/api/portfolios')
                .then((response) => {
                    localStorage.setItem(PortfolioBalanceData.KEY_BALANCE, JSON.stringify(response.data));
                    localStorage.setItem(PortfolioBalanceData.KEY_BALANCE_TIMESTAMP, moment().format('x'));

                    return resolve(response.data);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
    }
}
