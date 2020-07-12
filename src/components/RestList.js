import React from "react";

class RestList extends React.Component {
    render () {
        return (
            <div>
                <p>{ this.props.data.name }</p>
                <p>{ this.props.data.id }</p>
            </div>
        )
    }

}


export default RestList;
