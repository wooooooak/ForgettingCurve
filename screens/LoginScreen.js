import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = (props) => {
	return (
		<View>
			<Text style={{ paddingTop: 50 }}>Sign In With Google</Text>
			<Button title="Sign in with Google" onPress={() => props.signIn()} />
		</View>
	);
};

export default LoginScreen;
