import React from "react";
import { Card, RangeSlider, Button, Modal, TextContainer } from "@shopify/polaris";
import { getCurrentPosition } from "../actions/location";
import getRestaurants from "../actions/gnavi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionModal: false
    }
  }

  componentDidMount() {
    this.currentLocation();
  }

  currentLocation = () => {
    getCurrentPosition()
      .then((position) => {
        this.props.updateState({
          locState: "SUCCESS",
          coords: position.coords,
        });
      })
      .catch((err) => {
        this.props.updateState({ locState: "ERROR", locError: err.message });
      });
  };

  searchRestaurants = (page) => {

    const test_coords = {
      latitude: 35.680406,
      longitude: 139.766486,
    };

    this.props.updateState({ isSearched: false,
                             isLoading: true });

    getRestaurants(test_coords, this.props.distRange, this.props.perPage, page)
      .then((resp) => {
        const totalHitCount = resp.data["total_hit_count"];
        const totalPages = Math.ceil(totalHitCount / this.props.perPage);

        this.props.updateState({
          restFound: true,
          restaurants: resp.data["rest"],
          totalHitCount: totalHitCount,
          currentPage: 1,
          totalPages: totalPages,
          isSearched: true,
          isLoading: false,
          history: {}
        });
      })
      .catch((err) => {
        this.props.updateState({
          restFound: false,
          restaurants: [],
          totalHitCount: 0,
          restError: err.message,
          currentPage: 1,
          totalPages: 1,
          isSearched: true,
          isLoading: false,
          history: {}
        });
      });
  };

  handleRestSearch = (event) => {
    event.persist();
    this.searchRestaurants(1);
  };

  handleDistRangeChange = (value) => {
    this.props.updateState({ distRange: value });
  };

  handlePositionModal = () => {
    this.setState({positionModal: !this.state.positionModal});
  }

  render() {
    let location;

    const distRanges = {
      1: "300m",
      2: "500m",
      3: "1km",
      4: "2km",
      5: "3km",
    };

    if (this.props.locState === "LOADING") {
      location = <div>現在地を取得しています...</div>;
    } else if (this.props.locState === "ERROR") {
      location = <div>現在地を取得できませんでした</div>;
    } else {
      location = (
        <div>
          Latitude: {this.props.coords.latitude}
          <br />
          Longitude: {this.props.coords.longitude}
          <br />
        </div>
      );
    }

    return (
      <Card
        title="現在地"
        primaryFooterAction={{
          content: "検索",
          onAction: this.handleRestSearch,
        }}
        sectioned
      >
        <Button onClick={this.handlePositionModal}>位置情報を取得</Button>
        <Modal
          open={this.state.positionModal}
          title="位置情報を取得"
          onClose={this.handlePositionModal}>
          <Modal.Section>
            <TextContainer>
              <p>位置情報を取得する</p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        {location}
        <br />
        <RangeSlider
          label="検索範囲"
          labelHidden={true}
          min={1}
          max={5}
          step={1}
          value={this.props.distRange}
          prefix={<span>現在地から</span>}
          suffix={<span>{distRanges[this.props.distRange]}以内</span>}
          onChange={this.handleDistRangeChange}
        />
      </Card>
    );
  }
}

export default Search;
