
export default class Session
{
    static store(key: string, value: any)
    {
        localStorage.setItem(key, value);
    }

    static get(key: string)
    {
        return localStorage.getItem(key);
    }

    static clear()
    {
        localStorage.clear();
    }
}
