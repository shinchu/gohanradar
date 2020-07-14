import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/styles.min.css";

import App from "./components/App";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <AppProvider
        i18n={{}}
        features={{ newDesignLanguage: true }}
        theme={{
          colors: {
            surface: "#111213",
            onSurface: "#111213",
            interactive: "#2e72d2",
            secondary: "#111213",
            primary: "#3b5998",
            critical: "#d82c0d",
            warning: "#ffc453",
            highlight: "#5bcdda",
            success: "#008060",
            decorative: "#ffc96b",
          },
        }}
      >
        <App />
      </AppProvider>
    </AppContainer>,
    document.getElementById("app")
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept("./components/App", () => render(App));
