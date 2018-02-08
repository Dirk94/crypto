import * as  moment from 'moment';

export default class Auth
{
    static KEY_TOKEN_RECEIVED_AT = 'token_received_at';

    static KEY_TOKEN = 'token';

    static login(token: string)
    {
        // Sanity function: remove old localStorage
        Auth.logout();

        const tokenReceivedAt = moment().format('x');
        localStorage.setItem(Auth.KEY_TOKEN_RECEIVED_AT, tokenReceivedAt);
        localStorage.setItem(Auth.KEY_TOKEN, token);
    }

    static isLoggedIn()
    {
        const token = localStorage.getItem(Auth.KEY_TOKEN);
        if (! token) {
            return false;
        }

        const tokenReceivedAtString = localStorage.getItem(Auth.KEY_TOKEN_RECEIVED_AT);
        const tokenReceivedAt = moment(tokenReceivedAtString, 'x');
        const differenceInMinutes = moment().diff(tokenReceivedAt) / 1000 / 60;

        if (differenceInMinutes >= parseInt(process.env.JWT_EXPIRE_TIME)) {
            Auth.logout();
            return false;
        }

        return true;
    }

    static logout()
    {
        localStorage.clear();
    }

    static getToken()
    {
        return localStorage.getItem(Auth.KEY_TOKEN);
    }
}
