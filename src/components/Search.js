import React from "react";
import {
  Card,
  RangeSlider,
  Button,
  Modal,
  TextContainer,
  TextField,
  ResourceList,
  ResourceItem,
  Scrollable,
  Tooltip
} from "@shopify/polaris";
import {
  getCurrentPosition,
  getCurrentLocationFromPosition,
  getCurrentPositionFromLocation,
} from "../actions/location";
import getRestaurants from "../actions/gnavi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationModal: false,
      locationKeyword: "",
      locationCandidates: [],
      isLoading: false,
    };
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

        getCurrentLocationFromPosition(this.props.coords)
          .then((resp) => {
            const pref = resp.data.result["prefecture"]["pname"];
            const city = resp.data.result["municipality"]["mname"];
            this.props.updateState({ city: `${pref} ${city}` });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        this.props.updateState({ locState: "ERROR", locError: err.message });
      });
  };

  currentPosition = () => {
    this.setState({ isLoading: true });
    getCurrentPositionFromLocation(this.state.locationKeyword)
      .then((resp) => {
        const candidates = resp.data;
        this.setState({ locationCandidates: candidates, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
      });
  };

  searchRestaurants = (page) => {
    this.props.updateState({ isSearched: false, isLoading: true, history: {} });

    getRestaurants(
      this.props.coords,
      this.props.distRange,
      this.props.freeword,
      this.props.perPage,
      page
    )
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
          history: {},
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
          history: {},
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

  handleLocationModal = () => {
    this.setState({ locationModal: !this.state.locationModal });
    this.clearLocationKeyword();
  };

  handleGetLocation = () => {
    this.props.updateState({ locState: "LOADING" });
    this.currentLocation();
    this.handleLocationModal();
  };

  handleLocationKeyword = (value) => {
    this.setState({ locationKeyword: value });
  };

  handleFreeword = (value) => {
    this.props.updateState({ freeword: value });
  };

  clearLocationKeyword = () => {
    this.setState({ locationKeyword: "", locationCandidates: [] });
  };

  clearFreeword = () => {
    this.props.updateState({freeword: ""});
  }

  handleLocationSelect = (location) => {
    const city = location.properties.title;
    const longitude = location.geometry.coordinates[0];
    const latitude = location.geometry.coordinates[1];

    this.props.updateState({
      coords: {
        longitude: longitude,
        latitude: latitude,
      },
      city: city,
      locState: "SUCCESS"
    });

    this.handleLocationModal();
  };

  render() {
    let location;

    const distRanges = {
      1: "300m",
      2: "500m",
      3: "1km",
      4: "2km",
      5: "3km",
    };

    const radius = {
      1: 10,
      2: 20,
      3: 35,
      4: 55,
      5: 80
    }

    if (this.props.locState === "LOADING") {
      location = "現在地を取得しています...";
    } else if (this.props.locState === "ERROR") {
      location = "現在地を取得できませんでした";
    } else {
      location = this.props.city;
    }

    return (
      <Card
        title=""
        primaryFooterAction={{
          content: "検索",
          onAction: this.handleRestSearch,
        }}
        sectioned
      >

        <Modal
          open={this.state.locationModal}
          title="位置情報"
          onClose={this.handleLocationModal}
        >
          <Modal.Section>
            <TextContainer>
              <div className="loc-button-container">
                <Button onClick={this.handleGetLocation}>現在地を取得</Button>
              </div>
              <hr className="loc-search-divider" data-content="OR" />
              <div>キーワードから検索</div>
              <TextField
                label=""
                type="text"
                value={this.state.locationKeyword}
                onChange={this.handleLocationKeyword}
                clearButton={true}
                onClearButtonClick={this.clearLocationKeyword}
                placeholder="例：五反田駅"
                connectedRight={
                  <Button primary={true} onClick={this.currentPosition}>
                    検索
                  </Button>
                }
               />
              <Scrollable shadow style={{ height: "150px" }}>
                <ResourceList
                  items={this.state.locationCandidates}
                  loading={this.state.isLoading}
                  renderItem={(item) => {
                    return (
                      <ResourceItem
                        shortcutActions={[
                          {
                            content: "選択",
                            onAction: () => this.handleLocationSelect(item),
                          },
                        ]}
                        onClick={() => this.handleLocationSelect(item)}
                      >
                        {item.properties.title}
                      </ResourceItem>
                    );
                  }}
                />
              </Scrollable>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <svg viewBox="0 0 200 200" xmls="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" className="radar-circle" />
          <circle cx="100" cy="100" r="55" className="radar-circle" />
          <circle cx="100" cy="100" r="35" className="radar-circle" />
          <circle cx="100" cy="100" r="20" className="radar-circle" />
          <circle cx="100" cy="100" r="10" className="radar-circle" />
          <circle cx="100" cy="100" r={radius[this.props.distRange]} className="radar-cover-circle" />
          <circle cx="100" cy="100" r="5" className="radar-current-location" onClick={this.handleLocationModal} />
          <rect x="40" y="50" width="120" height="25" rx="10" ry="10" className="loc-indicator" onClick={this.handleLocationModal}/>
          <text x="100" y="67" textAnchor="middle" className="loc-text" onClick={this.handleLocationModal}>{location}</text>
        </svg>

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
        <br />
        <TextField
          label=""
          type="text"
          placeholder="カレー"
          value={this.props.freeword}
          onChange={this.handleFreeword}
          clearButton={true}
          onClearButtonClick={this.clearFreeword}
          prefix={<span>キーワード：</span>}
         />
      </Card>
    );
  }
}

export default Search;
