import React from "react";

class RestCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div>
          {this.props.address}
          {this.props.tel}
          {this.props.opentime}
        </div>
    );
  }
}

export default RestCard;
