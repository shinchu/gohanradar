import React from 'react';
import {Page, Card, Button} from '@shopify/polaris';
import './App.scss'
import getCurrentLocation from '../actions/location';

class App extends React.Component {

	state = {
		locationState: "LOADING",
		error: null,
		coords: null
	}

	componentDidMount() {
		this.currentLocation();
	}

	currentLocation = async() => {
		try {
			const position = await getCurrentLocation();
			this.setState({ locationState: "SUCCESS", coords: position.coords });
		} catch(e) {
			this.setState({ locationState: "ERROR", error: e.message });
		}
	}

	render() {

		const { locationState, error, coords } = this.state

		if (locationState === "LOADING") {
			return <div>Loading...</div>
		}
		if (locationState === "ERROR") {
			return  <div>{error}</div>
		}

		return (
			<Page title="ごはんレーダー">
				<Card sectioned>
					<Button onClick={() => alert('Button clicked!')}>
						Example button
					</Button>
					<div>
						Latitude: {coords.latitude}<br/>
						Longitude: {coords.longitude}
					</div>
				</Card>
			</Page>
		)
	}
}

export default App;