import React from "react";
import { Card, RangeSlider, Button, Modal, TextContainer, TextField, ResourceList, ResourceItem, Scrollable} from "@shopify/polaris";
import {getCurrentPosition, getCurrentLocationFromPosition, getCurrentPositionFromLocation} from "../actions/location";
import getRestaurants from "../actions/gnavi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationModal: false,
      locationKeyword: "",
      locationCandidates: []
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

        getCurrentLocationFromPosition(this.props.coords).then((resp) => {
          const pref = resp.data.result["prefecture"]["pname"];
          const city = resp.data.result["municipality"]["mname"];
          this.props.updateState({city: `${pref} ${city}`});
        }).catch((err) => {
          console.log(err);
        })

      })
      .catch((err) => {
        this.props.updateState({ locState: "ERROR", locError: err.message });
      });
  };

  currentPosition = () => {
    getCurrentPositionFromLocation(this.state.locationKeyword).then((resp) => {
      const candidates = resp.data;
      this.setState({locationCandidates: candidates});
    }).catch((err) => {
      console.log(err);
    })
  }

  searchRestaurants = (page) => {

    this.props.updateState({ isSearched: false,
                             isLoading: true,
                             history: {}});

    getRestaurants(this.props.coords, this.props.distRange, this.props.perPage, page)
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

  handleLocationModal = () => {
    this.setState({locationModal: !this.state.locationModal});
    this.clearLocationKeyword();
  }

  handleLocationKeyword = (value) => {
    this.setState({locationKeyword: value});
  }

  clearLocationKeyword = () => {
    this.setState({locationKeyword: "",
                         locationCandidates: []});
  }

  handleLocationSelect = (location) => {
    const city = location.properties.title;
    const longitude = location.geometry.coordinates[0];
    const latitude = location.geometry.coordinates[1];

    this.props.updateState({coords: {
        longitude: longitude,
        latitude: latitude
    },
    city: city});

    this.handleLocationModal();

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
          Longitude: {this.props.coords.longitude}
          <br />
          Latitude: {this.props.coords.latitude}
          <br />
          City: {this.props.city}
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
        <Button onClick={this.handleLocationModal}>位置情報を取得</Button>
        <Modal
          open={this.state.locationModal}
          title="位置情報を取得"
          onClose={this.handleLocationModal}>
          <Modal.Section>
            <TextContainer>
              <p>現在地を取得</p>
              <hr />
              <p>キーワードから検索</p>
              <TextField label=""
                         type="text"
                         value={this.state.locationKeyword}
                         onChange={this.handleLocationKeyword}
                         clearButton={true}
                         onClearButtonClick={this.clearLocationKeyword}
                         placeholder="例：五反田駅"
                         connectedRight={<Button primary={true}
                                                 onClick={this.currentPosition}>検索</Button>}></TextField>
              <Scrollable shadow style={{height: "150px"}}>
                <ResourceList items={this.state.locationCandidates}
                              renderItem={(item) => {
                                return (
                                    <ResourceItem
                                        shortcutActions={[{content: "選択",
                                                            onAction: () => this.handleLocationSelect(item)}]}
                                        onClick={() => this.handleLocationSelect(item)}>
                                      {item.properties.title}
                                    </ResourceItem>
                                )
                              }} />
              </Scrollable>
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
