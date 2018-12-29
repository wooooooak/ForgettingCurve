import React from 'react';
import { View, Text } from 'react-native';

import API from '../API';

export default class FamousSaying extends React.Component {
	state = {
		author: '',
		content: ''
	};
	async componentDidMount() {
		try {
			const { data } = await API.get(`/saying`);
			this.setState({
				...data
			});
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		console.log(this.state);
		return (
			<View>
				<Text>{this.state.content}</Text>
				<Text>{this.state.author}</Text>
			</View>
		);
	}
}
