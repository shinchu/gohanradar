import React from "react";
import RestList from "./RestList";
import RestNull from "./RestNull";

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
			rest = <RestNull content="近くのレストランが見つかりませんでした" />;
		}

        return (
            <div>
                { rest }
            </div>
        )
    }
}

export default RestContainer;
