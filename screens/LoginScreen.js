import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Button } from 'antd-mobile-rn';
import styled from 'styled-components/native';

const Background = styled(ImageBackground)`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;
const GoogleLoginButton = styled(Button)`
	background-color: #E53A40;
	min-width: 80%;
	margin-top: -100;
	border-radius: 5px;
	font-family: 'noto-sans-kr-bold';
`;

const LogoContainer = styled(View)`
	padding-top: 30;

`;

const Logo1 = styled.Text`
	font-size: 35;
	font-family: 'noto-sans-kr';
	color: #fffff2;
	margin-left: -40;
`;
const Logo2 = styled.Text`
	font-size: 35;
	margin-top: -45;
	margin-right: -40;
	font-family: 'noto-sans-kr';
	color: #fffff2;
`;

class LoginScreen extends React.Component {
	render() {
		return (
			<View>
				<Background
					blurRadius={7}
					source={require('../assets/images/login_page.jpg')}
					resizeMode="cover"
				>
					<LogoContainer>
						<Logo1>망각곡선</Logo1>
						<Logo2>극복하기</Logo2>
					</LogoContainer>
					<GoogleLoginButton onClick={() => this.props.signIn()}>
						구글 아이디로 로그인
					</GoogleLoginButton>
				</Background>
			</View>
		);
	}
}

export default LoginScreen;
