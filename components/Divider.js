import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const Div = styled(View)`
    height: 40px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
`;
const Line = styled(View)`
    height: 1px;
    width: 60%;
    background-color: #011638;
`;

const Divider = () => {
	return (
		<Div>
			<Line />
		</Div>
	);
};

export default Divider;
