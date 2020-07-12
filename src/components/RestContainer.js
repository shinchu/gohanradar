import React from "react";
import RestList from "./RestList";

class RestContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {

        const { restaurants, restFound } = this.props;
		let rest;

		if (restFound === true) {
			rest = <div>{ restaurants.map(restaurant => <RestList key={restaurant.id} rest={restaurant} />) }</div>
		} else {
			rest = <div>近くのレストランが見つかりませんでした</div>
		}

        return (
            <div>
                { rest }
            </div>
        )
    }
}

export default RestContainer;
