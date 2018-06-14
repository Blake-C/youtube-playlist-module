import React from 'react';
import ReactDOM from 'react-dom';

class Content extends React.Component{
	render() {
		return(
			<div>
				<div className="custom-class">
					<h1>React, Hello World!</h1>
					<p>From React!</p>
				</div>
			</div>
		);
	}
}

class Hello extends React.Component{
	render() {
		return(
			<div>
				<Content />
			</div>
		);
	}
}

ReactDOM.render(<Hello />, document.getElementById('app'));
