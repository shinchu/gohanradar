import React from 'react';
import { Button } from '@blueprintjs/core';
import './App.scss'

class App extends React.Component {
	render() {
		const myButton = <Button value="送信" />
		return (
			<div>
				<h1>Hello React</h1>
				<p>hehehe</p>
				{myButton}
			</div>
		)
	}
}

export default App;