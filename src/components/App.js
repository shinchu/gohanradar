import React from "react";
import { Page, Layout } from "@shopify/polaris";
import "./App.scss";
import Search from "./Search";
import RestContainer from "./RestContainer";
import Paginator from "./Pagination";
import Loading from "./Loading";
import RestNull from "./RestNull";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locState: "LOADING",
      locError: null,
      coords: null,
      freeword: "",
      city: "現在地",
      restError: null,
      restaurants: [],
      restFound: false,
      totalHitCount: 0,
      currentPage: 1,
      totalPages: 1,
      isSearched: false,
      isLoading: false,
      history: {},
      distRange: 2,
      perPage: 10,
    };
  }

  updateState(state) {
    this.setState(state);
  }

  render() {
    const { isSearched, isLoading, restFound } = this.state;
    let results, pagination, spinner;

    if (isSearched) {
      pagination = (
        <Paginator {...this.state} updateState={this.updateState.bind(this)} />
      );

      if (isLoading) {
        results = null;
        spinner = <Loading />;
      } else {
        results = <RestContainer {...this.state} />;
        spinner = null;
      }
    } else {
      if (isLoading) {
        results = null;
        spinner = <Loading />;
      } else {
        results = <RestNull content="近くのレストランを探してみましょう"/>;
        pagination = null;
        spinner = null;
      }
    }

    if (!restFound) {
      pagination = null;
    }

    return (
      <Page title="ごはんレーダー">
        <Layout>
          <Layout.Section secondary>
            <Search {...this.state} updateState={this.updateState.bind(this)} />
            {pagination}
          </Layout.Section>
          <Layout.Section>
		  	{spinner}
            <div className="rest-list-container">{results}</div>
            {pagination}
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
}

export default App;
