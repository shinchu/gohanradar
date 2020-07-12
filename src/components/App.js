import React from 'react';
import { Page, Layout, Spinner } from '@shopify/polaris';
import './App.scss'
import Search from "./Search";
import RestContainer from "./RestContainer";
import Paginator from "./Pagination";


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
			totalPages: 1,
			isSearched: false,
			isLoading: false
		}
	}

	updateState(state) {
		this.setState(state);
	}

	render() {

		const { isSearched, isLoading } = this.state;
		let results, pagination;

		if (isSearched) {
			if (isLoading) {
				results = <Spinner />
			} else {
				results = <RestContainer { ...this.state } />
				pagination = <Paginator currentPage={ this.state.currentPage }
										totalPages={ this.state.totalPages } />
			}
		} else {
			if (isLoading) {
				results = <Spinner />
			} else {
				results = <span>近くのレストランを探してみましょう</span>
				pagination = null
			}
		}

		return (
			<Page title="ごはんレーダー">
				<Layout>
					<Layout.Section secondary>
						<Search { ...this.state } updateState={this.updateState.bind(this)} />
						{ pagination }
					</Layout.Section>
					<Layout.Section>
						<div className="rest-list-container">
							{ results }
						</div>
						{ pagination }
					</Layout.Section>
				</Layout>
			</Page>
		)
	}
}

export default App;
