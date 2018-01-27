import React from 'react';
import PropTypes from 'prop-types';
import String from "../../../common/String.jsx";
import Loader from "../../../common/Loader.jsx";
import AnimateOnChange from 'react-animate-on-change';

export default class PortfolioBalance extends React.Component
{
    static propTypes = {
        amount: PropTypes.number,
        percentage1h: PropTypes.number,
        percentage24h: PropTypes.number,
        percentage7d: PropTypes.number
    }

    constructor(props)
    {
        super(props);

        this.state = {
            extraClassName: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.amount != this.props.amount) {
            console.log(nextProps.amount);
            console.log(this.props.amount);
            console.log("");
            this.setState({
                extraClassName: 'animated bounce'
            });
        }

        setTimeout(() => {
            this.setState({extraClassName: ''});
        }, 1000)
    }

    render() {
        return (
            <div className="statcard p-3">
                <span className={"statcard-desc " + this.state.extraClassName}>Portfolio Value</span>

                <div className="statcard-number statcard-number--h3">
                    {(this.props.amount !== -1) ? (
                        <div>
                            <div className={"statcard-number__amount " + this.state.extraClassName}>
                                {String.formatAsMoney(this.props.amount)}
                            </div>
                            <div className={"statcard-number__percentages"}>
                                <div className={"statcard-number__percentages__percentage " + this.state.extraClassName}>
                                    <small className={
                                        "delta-indicator " + (this.props.percentage1h >= 0 ? "delta-positive" : "delta-negative")
                                    }>
                                        {String.numberFormat(this.props.percentage1h, 2)}%
                                    </small>
                                    <div className="statcard-number__change">
                                        1h change
                                    </div>
                                </div>
                                <div className={"statcard-number__percentages__percentage " + this.state.extraClassName}>
                                    <small className={
                                        "delta-indicator " + (this.props.percentage24h >= 0 ? "delta-positive" : "delta-negative")
                                    }>
                                        {String.numberFormat(this.props.percentage24h, 2)}%
                                    </small>
                                    <div className="statcard-number__change">
                                        24h change
                                    </div>
                                </div>
                                <div className={"statcard-number__percentages__percentage " + this.state.extraClassName}>
                                    <small className={
                                        "delta-indicator " + (this.props.percentage7d >= 0 ? "delta-positive" : "delta-negative")
                                    }>
                                        {String.numberFormat(this.props.percentage7d, 2)}%
                                    </small>
                                    <div className="statcard-number__change">
                                        7d change
                                    </div>
                                </div>
                            </div>
                        </div> 
                    ) : (
                        <div>
                            <Loader loading={true}/>        
                        </div>
                    ) }
                </div>

            </div>
        );
    }
}
