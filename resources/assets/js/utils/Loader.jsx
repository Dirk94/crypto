import React from 'react';
import PropTypes from 'prop-types';
import {ScaleLoader} from "react-spinners";

export default class Loader extends React.Component
{
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <ScaleLoader
                color="#f5f5f5"
                height={20}
                size={20}
                loading={this.props.loading}
            />
        )
    }
}
