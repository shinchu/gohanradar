import React from 'react';
import axios from 'axios';
import {Page, Card, Button} from '@shopify/polaris';
import './App.scss'
import getCurrentLocation from '../actions/location';


const GNAVI_API_URL = 'https://api.gnavi.co.jp/RestSearchAPI/v3/'
const GAREA_API_URL = 'https://api.gnavi.co.jp/master/GAreaSmallSearchAPI/v3/'
const API_KEY = process.env.REACT_APP_GNAVI_API_KEY

class App extends React.Component {

	state = {
		locationState: "LOADING",
		error: null,
		coords: null,
		restaurants: [],
		restFound: false,
		areas: []
	}

	componentDidMount() {
		this.currentLocation()
		this.getAreaCode()
	}

	currentLocation = async () => {
		try {
			const position = await getCurrentLocation()
			this.setState({ locationState: "SUCCESS", coords: position.coords })
		} catch (e) {
			this.setState({ locationState: "ERROR", error: e.message })
		}
	}

	getRestaurants = async () => {
		try {
			const resp = await axios.get(`${GNAVI_API_URL}?keyid=${API_KEY}
												&input_coordinates_mode=1
												&coordinates_mode=1
												&latitude=${this.state.coords.latitude}
												&longitude=${this.state.coords.longitude}
												&range=3`)

			this.setState({ restFound: true,  restaurants: resp.data["rest"]})
			console.log(resp)
		} catch (e) {
			this.setState({ restFound: false })
			console.warn(e.message)
		}
	}

	getAreaCode = async () => {
		try {
			const resp = await axios.get(`${GAREA_API_URL}?keyid=${API_KEY}&lang=ja`)
			this.setState({ areas: resp.data["garea_small"] })
			console.log(resp)
		} catch (e) {
			console.warn(e.message)
		}
	}

	render() {

		const { locationState, error, coords, restaurants, restFound } = this.state
		let location, rest

		if (locationState === "LOADING") {
			location = <div>Loading...</div>
		} else if (locationState === "ERROR") {
			location = <div>{error}</div>
		} else {
			location = (
				<div>
						Latitude: { coords.latitude }<br/>
						Longitude: { coords.longitude }<br/>
				</div>
			)
		}

		if (restFound === true) {
			rest = <div> { restaurants.map(restaurant => <p key={restaurant.id}>{restaurant.name}</p>) } </div>
		}

		return (
			<Page title="ごはんレーダー">
				<Card sectioned>
					<Button onClick={() => { this.getRestaurants() }}>
						検索
					</Button>
					{ location }
					{ rest }
				</Card>
			</Page>
		)
	}
}

export default App;
