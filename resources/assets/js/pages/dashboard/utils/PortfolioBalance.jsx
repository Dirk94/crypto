import React from 'react';
import PropTypes from 'prop-types';
import String from "../../../common/String.jsx";
import Loader from "../../../common/Loader.jsx";
import AnimateOnChange from 'react-animate-on-change';

export default class PortfolioBalance extends React.Component
{
    static propTypes = {
        amount: PropTypes.number,
        percentage: PropTypes.number
    }

    constructor(props)
    {
        super(props);

        this.setState({
            extraClassName: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            extraClassName: 'animated bounce'
        });

        setTimeout(() => {
            this.setState({extraClassName: ''});
        }, 1000)
    }

    render() {
        return (
            <div className="statcard p-3">
                <div className="statcard-number statcard-number--h3">
                    
                    {(this.props.amount !== -1) ? (
                        <div>
                            <div className={"statcard-number__amount " + this.state.extraClassName}>
                                {String.formatAsMoney(this.props.amount)}
                            </div>

                            {this.props.percentage >= 0 ? (
                                <div className={"statcard-number__right " + this.state.extraClassName}>
                                    <small className="delta-indicator delta-positive">
                                        {String.numberFormat(this.props.percentage, 2)}%
                                    </small>
                                    <div className="statcard-number__change">
                                        24h change
                                    </div>
                                </div>
                            ) : (
                                <div className={"statcard-number__right " + this.state.extraClassName}>
                                    <small className="delta-indicator delta-negative">
                                        {String.numberFormat(this.props.percentage, 2)}%
                                    </small>
                                    <div className="statcard-number__change">
                                        24h change
                                    </div>
                                </div>
                            )}
                        </div> 
                    ) : (
                        <div>
                            <Loader loading={true}/>        
                        </div>
                    ) }
                </div>
                <span className="statcard-desc">Portfolio Value</span>
            </div>
        );
    }
}
