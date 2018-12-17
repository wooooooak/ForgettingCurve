import React from 'react';
import { View, Text, Button } from 'react-native';

class LoginScreen extends React.Component {
	render() {
		return (
			<View>
				<Text style={{ paddingTop: 50 }}>Sign In With Google</Text>
				<Button
					title="Sign in with Google"
					onPress={() => this.props.signIn()}
				/>
			</View>
		);
	}
}

export default LoginScreen;
