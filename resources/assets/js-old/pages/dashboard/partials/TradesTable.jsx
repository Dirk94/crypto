import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class TradesTable extends React.Component
{
    // TODO find a better way to do this...
    static symbolsThatHaveAnIcon = [
        'act', 'ada', 'adx', 'ae', 'aion', 'amp', 'ant', 'ardr', 'ark', 'atm',
        'bat', 'bay', 'bcc', 'bch', 'bcn', 'bdl', 'bela', 'blcn', 'blk', 'block',
        'bnb', 'bnt', 'bq', 'bqx', 'btc', 'btcd', 'btcz', 'btg', 'btm', 'bts',
        'btx', 'burst', 'cdn', 'clam', 'cloak', 'cnd', 'cnx', 'cny', 'cred', 'crpt',
        'cvc', 'dash', 'dat', 'data', 'dbc', 'dcn', 'dcr', 'dent', 'dgb', 'dgd', 'doge',
        'drgn', 'edg', 'edoge', 'elf', 'ella', 'emc', 'emc2', 'eng', 'eos', 'etc', 'eth',
        'ethos', 'etn', 'etp', 'eur', 'evx', 'exmo', 'exp', 'fair', 'fct', 'fil', 'fldc',
        'flo', 'fun', 'game', 'gas', 'gbp', 'gbx', 'gbyte', 'gno', 'gnt', 'grc', 'grs',
        'gup', 'gxs', 'hsr', 'huc', 'hush', 'icn', 'icx', 'ins', 'iost', 'jpy', 'kcs',
        'kin', 'kmd', 'knc', 'krb', 'lbc', 'link', 'lkk', 'lrc', 'lsk', 'ltc', 'maid',
        'mana', 'mcap', 'mco', 'med', 'miota', 'mkr', 'mln', 'mnx', 'mona', 'mtl', 'music',
        'nas', 'nav', 'ndz', 'nebl', 'neo', 'neos', 'ngc', 'nlc2', 'nlg', 'nmc', 'nxs',
        'nxt', 'omg', 'omni', 'ost', 'osx', 'pac', 'part', 'pasl', 'pay', 'pink', 'pirl', 'pivx',
        'plr', 'poe', 'pot', 'powr', 'ppc', 'ppt', 'pura', 'qash', 'qiwi', 'qlc' ,'qsp', 'qtum',
        'rads', 'rcn', 'rdd', 'rdn', 'rep', 'req', 'rhoc', 'ric', 'rise', 'rlc', 'rpx', 'rub',
        'salt', 'san', 'sbd', 'sberbank', 'sc', 'sky', 'smart', 'sngls', 'snt', 'sphtx', 'srn',
        'start', 'steem', 'storj', 'storm', 'strat', 'sub', 'sys', 'taas', 'tau', 'tkn', 'tnc', 'trx',
        'tzc', 'ubq', 'usd', 'usdt', 'ven', 'veri', 'via', 'vivo', 'vrc', 'vtc', 'waves', 'wax', 'wtc',
        'xbc', 'xcp', 'xdn', 'xem', 'xlm', 'xmg', 'xmr', 'xmy', 'xp' , 'xpm', 'xrb', 'xrp', 'xtz', 'xuc',
        'xvc', 'xvg', 'xzc', 'zcl' ,'zcl', 'zec', 'zen', 'zrx'
    ];

    static propTypes = {
        transactions: PropTypes.array
    }

    render()
    {
        return (
            <table className="table trades-table" data-sort="table">
                <thead>
                <tr>
                    <th className="header">Date</th>
                    <th className="header">Buy Coin</th>
                    <th className="header">Buy Amount</th>
                    <th className="header">Sell Coin</th>
                    <th className="header">Sell Amount</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.transactions.map((transaction, index) => {
                        let offset = moment().utcOffset();
                        console.log("UTC offset");
                        console.log(offset);

                        let localText = moment.utc(transaction.transaction_at_utc).utcOffset(offset).format('YYYY-MM-DD HH:mm:ss');
                        console.log("UTC time: " + transaction.transaction_at_utc);
                        console.log("Local time: " + localText);



                        return (
                            <tr>
                                <td>{transactionAtLocal.format('YYY-MM-DD HH:mm:ss')}</td>
                                <td>
                                    {transaction.in_coin_id != null && (
                                        <div>
                                            <div class="trades-table__crypto-icon" style={{display: 'inline-block'}}>
                                                <img
                                                    className="trades-table__crypto-icon"
                                                    src={"/images/coin-icons/" + transaction.in_coin_symbol.toLowerCase() + ".svg"}
                                                    style={
                                                        (TradesTable.symbolsThatHaveAnIcon.indexOf(transaction.in_coin_symbol.toLowerCase()) > -1) ?
                                                             {} : {display: 'none'}
                                                    }
                                                />
                                            </div>
                                            {transaction.in_coin_name + " (" + transaction.in_coin_symbol + ")"}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    {transaction.in_coin_id != null && (
                                        <span>{transaction.in_amount}</span>
                                    )}
                                </td>
                                <td>
                                    {transaction.out_coin_id != null && (
                                        <span>
                                            <img
                                                className="trades-table__crypto-icon"
                                                src={"/images/coin-icons/" + transaction.out_coin_symbol.toLowerCase() + ".svg"}
                                                style={
                                                    (TradesTable.symbolsThatHaveAnIcon.indexOf(transaction.out_coin_symbol.toLowerCase()) > -1) ?
                                                        {} : {display: 'none'}
                                                }
                                            />
                                            {transaction.out_coin_name + "(" + transaction.out_coin_symbol + ")"}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {transaction.out_coin_id != null && (
                                        <span>{transaction.out_coin_amount}</span>
                                    )}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}
