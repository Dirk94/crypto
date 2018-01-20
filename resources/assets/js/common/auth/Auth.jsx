import moment from 'moment';

export default class Auth {

    static JWT_EXPIRES_AFTER = 420; // In minutes TODO: make this an env file.

    static tokenReceivedAt; // moment js object.

    static authenticateUser(token) {
        const tokenReceivedAt = moment().format('x');
        localStorage.setItem('tokenReceivedAt', tokenReceivedAt);
        localStorage.setItem('token', token);
    }

    static isLoggedIn() {
        const token = localStorage.getItem('token');
        const now = moment();
        const tokenReceivedAtTimestamp = localStorage.getItem('tokenReceivedAt');

        if (tokenReceivedAtTimestamp === null) {
            return false;
        }

        const tokenReceivedAtMoment = moment(tokenReceivedAtTimestamp, 'x');
        const diffInMinutes = now.diff(tokenReceivedAtMoment) / 1000 / 60;

        if (diffInMinutes >= Auth.JWT_EXPIRES_AFTER) {
            Auth.userLogout();
            return false;
        }
        
        return token !== null;
    }

    static userLogout() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}
