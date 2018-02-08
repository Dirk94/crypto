import * as React from 'react';
import * as PropTypes from 'prop-types';
import {ScaleLoader} from "react-spinners";

export default class Loader extends React.Component<any, any>
{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        inverse: PropTypes.bool.isRequired,
    }

    constructor(props: any)
    {
        super(props);
    }

    render()
    {
        return this.props.inverse ? (
            <ScaleLoader
                color="#252525"
                height={20}
                loading={this.props.loading}
            />
        ) : (
            <ScaleLoader
                color="#f5f5f5"
                height={20}
                loading={this.props.loading}
            />
        );
    }
}
