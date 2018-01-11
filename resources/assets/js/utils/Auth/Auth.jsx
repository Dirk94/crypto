
export default class Auth {

    static authenticateUser(token) {
        localStorage.setItem('token', token);
    }

    static isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    static userLogout() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}
