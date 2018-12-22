import React from 'react';
import {
	Platform,
	StatusBar,
	StyleSheet,
	View,
	Text,
	Button
} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import LoginScreen from './screens/LoginScreen';
import API from './API';

import { store, persistor } from './store';
import { login } from './redux/user';

export default class App extends React.Component {
	state = {
		isLoadingComplete: false
	};

	signIn = async () => {
		try {
			const result = await Expo.Google.logInAsync({
				androidClientId:
					'587052644534-n336sts1anjlg59ka3nb9gfnuils27h3.apps.googleusercontent.com',
				//iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
				scopes: [ 'profile', 'email' ]
			});
			if (result.type === 'success') {
				const { data } = await API.post(`auth/login`, {
					email: result.user.email,
					name: result.user.name,
					photoUrl: result.user.photoUrl
				});
				console.log(data);
				store.dispatch(
					login({
						token: data.token,
						username: data.user.name,
						email: data.user.email,
						photoUrl: data.photoUrl
					})
				);
				this.setState({
					...this.state
				});
			} else {
				console.log('cancelled');
			}
		} catch (e) {
			console.log('error', e);
		}
	};

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync={this._loadResourcesAsync}
					onError={this._handleLoadingError}
					onFinish={this._handleFinishLoading}
				/>
			);
		} else {
			return store.getState().user.token ? (
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<View style={styles.container}>
							{Platform.OS === 'ios' && (
								<StatusBar barStyle="default" />
							)}
							<AppNavigator />
						</View>
					</PersistGate>
				</Provider>
			) : (
				// <View style={styles.container}>
				// 	{Platform.OS === 'ios' && <StatusBar barStyle="default" />}
				// 	<AppNavigator />
				// </View>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<LoginScreen signIn={this.signIn} />
					</PersistGate>
				</Provider>
			);
		}
	}

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([
				require('./assets/images/robot-dev.png'),
				require('./assets/images/robot-prod.png')
			]),
			Font.loadAsync({
				// This is the font that we are using for our tab bar
				...Icon.Ionicons.font,
				// We include SpaceMono because we use it in HomeScreen.js. Feel free
				// to remove this if you are not using it in your app
				'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				'noto-sans-kr': require('./assets/fonts/NotoSansKR-Regular.otf'),
				'noto-sans-kr-light': require('./assets/fonts/NotoSansKR-Light.otf'),
				'noto-sans-kr-medium': require('./assets/fonts/NotoSansKR-Medium.otf'),
				'noto-sans-kr-bold': require('./assets/fonts/NotoSansKR-Bold.otf')
			})
		]);
	};

	_handleLoadingError = (error) => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => {
		this.setState({ isLoadingComplete: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f5f9'
	}
});
