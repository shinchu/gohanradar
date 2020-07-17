import React from "react";

class Image extends React.Component{
    render () {
        return (
            <img src={this.props.source} className="rest-image" width="180" />
        )
    }
}

export default Image;
