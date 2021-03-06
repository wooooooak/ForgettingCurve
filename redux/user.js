export const UPDATE_USERNAME = 'user/UPDATE_USERNAME';
export const LOGIN = 'user/LOGIN';

export const updateUsername = (username) => ({
	type: UPDATE_USERNAME,
	username
});

export const login = (userData) => ({
	type: LOGIN,
	userData
});

const initialState = {
	token: '',
	email: '',
	username: '',
	photoUrl: ''
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USERNAME:
			return {
				...state,
				username: action.username
			};
		case LOGIN:
			return {
				token: action.userData.token,
				email: action.userData.email,
				username: action.userData.username,
				photoUrl: action.userData.photoUrl
			};
		default:
			return state;
	}
};
