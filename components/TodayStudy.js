import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components/native';
const boxHeight = 110;

const Box = styled(View)`
    margin: 5px 0px;
    height: ${boxHeight}px;
    padding: 0 20px;
    font-family: "noto-sans-kr";
    elevation: 3px;
`;
const LinearGradientBox = styled(LinearGradient)`
    margin: 5px 0px;
    height: ${boxHeight}px;
    border-radius: 20;
    elevation: 3px;
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
				colors={[ '#74ebd5', '#acb6e5' ]}
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
