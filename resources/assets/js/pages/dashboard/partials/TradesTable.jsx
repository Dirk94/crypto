import React from 'react';

export default class TradesTable extends React.Component
{
    render()
    {
        return (
            <table className="table" data-sort="table">
                <thead>
                <tr>
                    <th className="header"><input type="checkbox" className="select-all" id="selectAll" /></th>
                    <th className="header headerSortDown">Order</th>
                    <th className="header">Customer name</th>
                    <th className="header">Description</th>
                    <th className="header">Date</th>
                    <th className="header">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10001</a></td>
                    <td>First Last</td>
                    <td>Admin theme, marketing theme</td>
                    <td>01/01/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10002</a></td>
                    <td>Firstname Last</td>
                    <td>Admin theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10003</a></td>
                    <td>Name Another</td>
                    <td>Personal blog theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10004</a></td>
                    <td>One More</td>
                    <td>Marketing theme, personal blog theme, admin theme</td>
                    <td>01/01/2015</td>
                    <td>$300.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10005</a></td>
                    <td>Name Right Here</td>
                    <td>Personal blog theme, admin theme</td>
                    <td>01/02/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10006</a></td>
                    <td>First Last</td>
                    <td>Admin theme, marketing theme</td>
                    <td>01/01/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10007</a></td>
                    <td>Firstname Last</td>
                    <td>Admin theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10008</a></td>
                    <td>Name Another</td>
                    <td>Personal blog theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10009</a></td>
                    <td>One More</td>
                    <td>Marketing theme, personal blog theme, admin theme</td>
                    <td>01/01/2015</td>
                    <td>$300.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10010</a></td>
                    <td>Name Right Here</td>
                    <td>Personal blog theme, admin theme</td>
                    <td>01/02/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10011</a></td>
                    <td>First Last</td>
                    <td>Admin theme, marketing theme</td>
                    <td>01/01/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10012</a></td>
                    <td>Firstname Last</td>
                    <td>Admin theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10013</a></td>
                    <td>Name Another</td>
                    <td>Personal blog theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10014</a></td>
                    <td>One More</td>
                    <td>Marketing theme, personal blog theme, admin theme</td>
                    <td>01/01/2015</td>
                    <td>$300.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10015</a></td>
                    <td>Name Right Here</td>
                    <td>Personal blog theme, admin theme</td>
                    <td>01/02/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10016</a></td>
                    <td>First Last</td>
                    <td>Admin theme, marketing theme</td>
                    <td>01/01/2015</td>
                    <td>$200.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10017</a></td>
                    <td>Firstname Last</td>
                    <td>Admin theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10018</a></td>
                    <td>Name Another</td>
                    <td>Personal blog theme</td>
                    <td>01/01/2015</td>
                    <td>$100.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10019</a></td>
                    <td>One More</td>
                    <td>Marketing theme, personal blog theme, admin theme</td>
                    <td>01/01/2015</td>
                    <td>$300.00</td>
                </tr><tr>
                    <td><input type="checkbox" className="select-row" /></td>
                    <td><a href="#">#10020</a></td>
                    <td>Name Right Here</td>
                    <td>Personal blog theme, admin theme</td>
                    <td>01/02/2015</td>
                    <td>$200.00</td>
                </tr></tbody>
            </table>
        )
    }
}
