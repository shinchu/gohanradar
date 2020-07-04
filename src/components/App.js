import React from 'react';
import {Page, Card, Button} from '@shopify/polaris';
import './App.scss'
import getCurrentLocation from '../actions/location';

class App extends React.Component {
	
	componentDidMount() {
		getCurrentLocation();
	}

	render() {
		return (
			<Page title="ごはんレーダー">
				<Card sectioned>
					<Button onClick={() => alert('Button clicked!')}>
						Example button
					</Button>
				</Card>
			</Page>
		)
	}
}

export default App;