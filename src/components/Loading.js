import React from "react";
import { Spinner } from "@shopify/polaris";

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }
}

export default Loading;
