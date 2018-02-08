import * as React from 'react';
import * as PropTypes from 'prop-types';
import Loader from "./Loader";

export default class Button extends React.Component<any, any>
{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        inverse: PropTypes.bool
    }

    render()
    {
        return (
            <div className="form-group">
                {!this.props.loading && (<button type="submit" className="btn btn-primary">{this.props.children}</button>)}
                <Loader loading={this.props.loading} inverse={this.props.inverse} />
            </div>
        )
    }
}
