import Request from "../Request.jsx";
import moment from 'moment';

export default class PortfolioBalanceData {

    static KEY_MINUTE_DATA = 'portfolioBalanceMinuteData';
    static KEY_MINUTE_DATA_TIMESTAMP = 'portfolioBalanceMinuteDataTimestamp';

    static KEY_HOUR_DATA = 'portfolioBalanceHourData';
    static KEY_HOUR_DATA_TIMESTAMP = 'portfolioBalanceHourDataTimestamp';

    static KEY_DAY_DATA = 'portfolioBalanceDayData';
    static KEY_DAY_DATA_TIMESTAMP = 'portfolioBalanceDayDataTimestamp';

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

    static getHourData() {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem(PortfolioBalanceData.KEY_HOUR_DATA);
            let timestamp = localStorage.getItem(PortfolioBalanceData.KEY_HOUR_DATA_TIMESTAMP);

            let now = moment();
            let momentTimestamp = moment(timestamp, 'x');
            const diffInMinutes = now.diff(momentTimestamp) / 1000 / 60;

            if (data !== null && diffInMinutes < PortfolioBalanceData.DATA_EXPIRE_TIME) {
                const parsedData = JSON.parse(data);
                return resolve(parsedData);
            }

            Request.get('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/history/hours')
                .then((response) => {
                    localStorage.setItem(PortfolioBalanceData.KEY_HOUR_DATA, JSON.stringify(response.data));
                    localStorage.setItem(PortfolioBalanceData.KEY_HOUR_DATA_TIMESTAMP, moment().format('x'));

                    return resolve(response.data);
                })
                .catch((error) => {
                    return reject(error);
                })
        });
    }

    static getDayData() {
        return new Promise((resolve, reject) => {
            let data = localStorage.getItem(PortfolioBalanceData.KEY_DAY_DATA);
            let timestamp = localStorage.getItem(PortfolioBalanceData.KEY_DAY_DATA_TIMESTAMP);

            let now = moment();
            let momentTimestamp = moment(timestamp, 'x');
            const diffInMinutes = now.diff(momentTimestamp) / 1000 / 60;

            if (data !== null && diffInMinutes < PortfolioBalanceData.DATA_EXPIRE_TIME) {
                const parsedData = JSON.parse(data);
                return resolve(parsedData);
            }

            Request.get('/api/portfolios/' + localStorage.getItem('defaultPortfolioId') + '/history/days')
                .then((response) => {
                    localStorage.setItem(PortfolioBalanceData.KEY_DAY_DATA, JSON.stringify(response.data));
                    localStorage.setItem(PortfolioBalanceData.KEY_DAY_DATA_TIMESTAMP, moment().format('x'));

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

    static flushCache() {
        localStorage.removeItem(PortfolioBalanceData.KEY_MINUTE_DATA);
        localStorage.removeItem(PortfolioBalanceData.KEY_HOUR_DATA);
        localStorage.removeItem(PortfolioBalanceData.KEY_DAY_DATA);
        localStorage.removeItem(PortfolioBalanceData.KEY_BALANCE);
    }
}
