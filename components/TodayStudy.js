import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components/native';
const boxHeight = 100;

const Box = styled(View)`
    margin: 0px auto 10px;
    width: 97%;
    height: ${boxHeight}px;
    padding: 0 20px;
    font-family: "noto-sans-kr";
    elevation: 5px;
`;
const LinearGradientBox = styled(LinearGradient)`
    margin: 0px auto 10px;
    width: 97%;
    height: ${boxHeight}px;
    border-radius: 20;
    elevation: 5px;
`;

const Title = styled(Text)`
    padding: 15px 10px 0;
    font-size: 20px;
`;

const Content = styled(Text)`
    font-size: 17px;
    padding: 10px;
`;

const TodayStudy = ({ title, content }) => {
	return (
		<Box>
			<LinearGradientBox
				colors={[ 'white', 'white' ]}
				start={[ 0, 0 ]}
				end={[ 1, 1 ]}
			>
				<Title>{title}</Title>
				<Content>{content}</Content>
			</LinearGradientBox>
		</Box>
	);
};

export default TodayStudy;
