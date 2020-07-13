import React from "react";
import { Pagination } from "@shopify/polaris";
import getRestaurants from "../actions/gnavi";

class Paginator extends React.Component {
  constructor(props) {
    super(props);
  }

  nextPage = () => {
    const page = this.props.currentPage + 1;
    this.handleHistory(page);
  };

  prevPage = () => {
    const page = this.props.currentPage - 1;
    this.handleHistory(page);
  };

  handleHistory = (page) => {
    if (!this.props.history[this.props.currentPage]) {
      this.props.updateState({ history: { ...this.props.history,
                                          [this.props.currentPage]: this.props.restaurants }});
    }

    if (this.props.history[page]) {
      this.props.updateState({
        restaurants: this.props.history[page],
        currentPage: page
      });
    } else {
      this.searchRestaurants(page);
    }
  }

  searchRestaurants = (page) => {
    const test_coords = {
      latitude: 35.680406,
      longitude: 139.766486,
    };

    this.props.updateState({ isLoading: true });

    getRestaurants(test_coords, this.props.distRange, this.props.perPage, page)
      .then((resp) => {
        this.props.updateState({
          restFound: true,
          restaurants: resp.data["rest"],
          currentPage: page,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.props.updateState({
          restFound: false,
          restaurants: [],
          restError: err.message,
          currentPage: 1,
          totalPages: 1,
          isLoading: false,
        });
      });
  };

  render() {
    const { currentPage, totalPages } = this.props;
    let hasNext = false,
        hasPrev = true;

    if (currentPage === 1) {
      hasPrev = false;
    } else {
      hasPrev = true;
    }

    if (currentPage === totalPages) {
      hasNext = false;
    } else {
      hasNext = true;
    }

    return (
      <div className="pagination-container">
        <Pagination
          label={`${currentPage}/${totalPages}`}
          hasNext={hasNext}
          hasPrevious={hasPrev}
          onNext={this.nextPage}
          onPrevious={this.prevPage}
        />
      </div>
    );
  }
}

export default Paginator;
