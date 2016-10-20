// topics/reducer.js

// Template Object
/*
{
	"topicsByUrl":{
		"/r/Jokes/": {
			"title": "Jokes",
			"description": "The funniest sub on reddit. Hundreds of jokes posted everyday, and some of them aren't even reposts! FarCraft"
		},
		"/r/pics/":{
			"title": "pics",
			"description": "I bet you can figure it out by reading the name of the subreddit"
		}
	},
	"selectedTopicUrls": ["/r/Jokes/"]
}
*/

import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

import _ from 'lodash';

const initialState = Immutable({
	topicsByUrl: undefined,
	selectedTopicUrls: []
});

export default function reduce(state = initialState, action = {}){
	switch(action.type){
		case types.TOPICS_FETCHED:
			return state.merge({
				topicsByUrl: action.topicsByUrl
			});
		default:
			return false;
	}
}

//selectors
export function getTopicsByUrl(state){
	return state.topics.topicsByUrl;
}

export function getTopicsUrlArray(state){
	return _.keys(state.topics.topicsByUrl);
}