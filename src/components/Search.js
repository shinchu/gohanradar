import React from "react";
import { Button, RangeSlider } from "@shopify/polaris";
import getCurrentLocation from "../actions/location";
import getRestaurants from "../actions/gnavi";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        	distRange: 2,
			perPage: 10
		}
    }

    componentDidMount () {
		this.currentLocation();
	}

    currentLocation () {
    	getCurrentLocation().then((position) => {
    		this.props.updateState({ locState: "SUCCESS", coords: position.coords });
		}).catch((err) => {
			this.props.updateState({ locState: "ERROR", locError: err.message });
		})
	}

	searchRestaurants(distRange, perPage, page) {

    	const test_coords = {
    		latitude: 35.680406,
			longitude: 139.766486
		}

    	getRestaurants(test_coords, distRange, perPage, page).then((resp) => {
    		const totalHitCount = resp.data["total_hit_count"];
    		const totalPages = Math.ceil(totalHitCount / perPage);

    		this.props.updateState({ restFound: true,
                                 	 restaurants: resp.data["rest"],
                                 	 totalHitCount: totalHitCount,
									 currentPage: 1,
									 totalPages: totalPages });
		}).catch((err) => {
			this.props.updateState({ restFound: false,
                                 	 restaurants: [],
                                 	 totalHitCount: 0,
									 restError: err.message,
									 currentPage: 1,
									 totalPages: 1 });
		})
    }

    handleDistRangeChange = (value) => {
    	this.setState({ distRange: value });
	}

    render () {

        let location;

        const distRanges = {
        	1: "300m",
			2: "500m",
			3: "1km",
			4: "2km",
			5: "3km"
		}

		if (this.props.locState === "LOADING") {
			location = <div>Loading...</div>
		} else if (this.props.locState === "ERROR") {
			location = <div>{error}</div>
		} else {
			location = (
				<div>
					Latitude: { this.props.coords.latitude }<br/>
					Longitude: { this.props.coords.longitude }<br/>
				</div>
			)
		}

        return (
            <div>
                { location }
                <RangeSlider label="検索範囲"
							 labelHidden={true}
							 min={1}
                			 max={5}
				             step={1}
							 value={ this.state.distRange }
							 prefix={ <span>現在地から</span> }
							 suffix={ <span>{ distRanges[this.state.distRange] }以内</span> }
							 onChange={ this.handleDistRangeChange } />

                <Button onClick={() => { this.searchRestaurants(this.state.distRange, this.state.perPage, 1) }}>
                    検索
                </Button>
            </div>
        )
    }
}

export default Search;
