//TopicsScreen.js

import React, { Component } from 'react';
import '.Component.css'

class TopicsScreen extends Component {
	render(){
		return(
			<div className="app">
			</div>
		);
	}	
}

function mapStateToProps(state){
	return{
		rowsById: topicsSelector.getTopicsByUrl(state),
		rowsIdArray: topicsSelector.getTopicsUrlArray(state)
	};
}

export default connect(mapStateToProps)(TopicsScreen);