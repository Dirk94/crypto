
export default class String
{
    static formatAsMoney(number: number, decimals: number = 2)
    {
        return "$" + String.numberFormat(number, decimals);
    }

    static numberFormat(number: number, decimals: any = 2)
    {
        const num    = (Math.round(number * 100) / 100).toFixed(decimals);
        let str    = num.toString();
        const length = str.length - 3;

        const numberOfCommas = Math.floor((length - 1) / 3);

        let commaIndex = str.length - 6;
        for (let i=0; i<numberOfCommas; i++) {
            str = [str.slice(0, commaIndex), ",", str.slice(commaIndex)].join('');
            commaIndex -= 3;
        }

        return str;
    }
}