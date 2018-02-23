import * as  moment from 'moment';
import Session from "./Session";

export default class Auth
{
    static KEY_TOKEN_RECEIVED_AT = 'token_received_at';

    static KEY_TOKEN = 'token';

    static isLoggedIn()
    {
        const token = Session.get(Auth.KEY_TOKEN);
        if (! token) {
            return false;
        }

        const tokenReceivedAtString = Session.get(Auth.KEY_TOKEN_RECEIVED_AT);
        const tokenReceivedAt = moment(tokenReceivedAtString, 'x');
        const differenceInMinutes = moment().diff(tokenReceivedAt) / 1000 / 60;

        if (differenceInMinutes >= parseInt(process.env.JWT_EXPIRE_TIME)) {
            Auth.logout();
            return false;
        }

        return true;
    }

    static login(token: string)
    {
        const tokenReceivedAt = moment().format('x');
        Session.store(Auth.KEY_TOKEN_RECEIVED_AT, tokenReceivedAt);
        Session.store(Auth.KEY_TOKEN, token);
    }

    static logout()
    {
        Session.clear();
    }

    static getToken()
    {
        return Session.get(Auth.KEY_TOKEN);
    }
}
