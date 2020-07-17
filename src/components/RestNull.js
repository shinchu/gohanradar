import React from "react";
import { DisplayText } from "@shopify/polaris";

class RestNull extends React.Component {
  render() {
    return (
      <div className="rest-null">
        <DisplayText size="large">{this.props.content}</DisplayText>
      </div>
    );
  }
}

export default RestNull;
