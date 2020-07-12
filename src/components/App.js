import React from 'react';
import {Page, Card, Layout} from '@shopify/polaris';
import './App.scss'
import RestList from "./RestList";
import Search from "./Search";


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			locState: "LOADING",
			locError: null,
			coords: null,
			restError: null,
			restaurants: [],
			restFound: false,
			totalHitCount: 0,
			currentPage: 1,
			totalPages: 1
		}
	}

	updateState(state) {
		this.setState(state);
	}

	render() {

		const { restaurants, restFound } = this.state;
		let rest, results;

		if (restFound === true) {
			rest = <div> { restaurants.map(restaurant => <RestList key={restaurant.id} data={restaurant} />) } </div>
			results = <span> { this.state.totalHitCount } 件 </span>
		} else {
			rest = <div> 近くのごはん屋さんを探しましょう </div>
			results = <span></span>
		}

		return (
			<Page title="ごはんレーダー">
				<Layout>
					<Layout.Section secondary>
						<Card title="現在地" sectioned>
							<Search { ...this.state } updateState={this.updateState.bind(this)} />
						</Card>
					</Layout.Section>
					<Layout.Section>
						<Card title="検索結果" sectioned>
							{ results }
							{ rest }
						</Card>
					</Layout.Section>
				</Layout>
			</Page>
		)
	}
}

export default App;
