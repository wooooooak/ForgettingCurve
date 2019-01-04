import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'antd-mobile-rn';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';

import API from '../API';
import FamousSaying from '../components/FamousSaying';
import { ELOOP } from 'constants';
import { CLIENT_RENEG_LIMIT } from 'tls';

export const ScreenPageWrapper = styled(View)`
	flex: 1;
	padding-top: 35px;
	background-color: ${(props) =>
		props.backgroundColor ? props.backgroundColor : '#f0f5f9'};
`;

export const ScrollViewCustom = styled(ScrollView)`
	flex: 1;
	margin-top: 20;
	background-color: transparent;
	backface-visibility: hidden;
`;

export const ScreenTitleWapper = styled.View`
	padding: 10px 0;
	background-color: transparent;
	height: 62px;
	width: 100%;
`;

export const ScreenTitle = styled.Text`
	font-size: 25px;
	color: black;
	font-family: 'noto-sans-kr-bold';
	text-align: center;
`;

const EmptyNotice = styled.View`padding: 20px;`;

const ReviewCard = styled(Card)`
	width: 95%;
	height: 100px;
	background-color: ${(props) => props.backgroundColor};
	shadow-offset: 2px;
	elevation: 5px;
	margin: 0 auto;
	/* padding-top: 5px; */
	padding-left: 20px;
	padding-right: 20px;
	border-radius: 10px;
	border-color: transparent;
	margin-bottom: 15px;
	display: flex;
`;

const TitleReview = styled.Text`
	color: black;
	font-family: 'noto-sans-kr';
	font-size: 18px;
	flex: 2;
`;

const ContentText = styled.Text`
	font-size: 14px;
	font-family: 'noto-sans-kr';
	flex: 2;
`;

const CycleText = styled.Text`
	font-size: 10px;
	text-align: right;
	flex: 1;
`;

const colorPicker = {
	0: '#A593E0',
	1: '#F16B6F',
	2: '#379392',
	3: '#FFBC42',
	4: '#EC7357'
};

const swipeBtns = [
	{
		text: 'Done',
		backgroundColor: 'transparent',
		underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		onPress: () => {
			this.deleteNote(rowData);
		},
		component: (
			<Ionicons name="md-checkmark-circle" size={32} color="green" />
		)
	},
	{
		text: 'Done',
		backgroundColor: 'transparent',
		underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
		onPress: () => {
			//this.state.activeRow를 찾으면 될 것 같은데..
			this.deleteNote(rowData);
		},
		component: (
			<View style={{ height: '100%' }}>
				<Text>done</Text>
			</View>
		)
	}
];

class ReviewListScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	state = {
		dataList: [],
		activeRow: null
	};

	async componentDidMount() {
		try {
			const {
				data
			} = await API.get(
				`study/reviewStudies?timeoffset=${moment().utcOffset()}`,
				{
					headers: {
						'auth-header': this.props.user.token
					}
				}
			);
			this.setState({
				dataList: data
			});
		} catch (error) {
			console.log(error);
		}
	}

	onSwipeOpen = (rowId, sectionId) => {
		this.setState({
			activeRow: rowId
		})
	}
	onSwipeOpen = (rowId, sectionId) => {
		this.setState({
			activeRow: null
		})
	}


	swipeBtns = (id) => ([
		{
			text: 'Done',
			backgroundColor: 'transparent',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
			onPress: () => {
				this.deleteNote(id);
			},
			component: (
				<Ionicons name="md-checkmark-circle" size={32} color="green" />
			)
		},
		{
			text: 'Done',
			backgroundColor: 'transparent',
			underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
			onPress: () => {
				console.log("delete number is : " + id);
				this.deleteNote(id);
			},
			component: (
				<View style={{ height: '100%' }}>
					<Text>done</Text>
				</View>
			)
		}
	])

	mapDataToState = (dataList) => {
		return dataList.map((el, index) => {
			const color = colorPicker[index % 5];
			
			return (
				<Swipeout
					key={index}
					style={{
						backgroundColor: 'transparent',
						width: '90%',
						marginLeft: 'auto',
						marginRight: 'auto'
					}}
					rowID={el.id}
					sectionId={el.id}
					close={(this.state.activeRow !== el.id)}
					onOpen={(sectionId,rowID) => this.onSwipeOpen(rowID, sectionId)}
					onClose={(sectionId,rowID) => this.onSwipeClose(rowID, sectionId)}
					right={this.swipeBtns(el.id)}
					autoClose={true}
				>
					<ReviewCard backgroundColor={color}>
						<TitleReview>{el.title}</TitleReview>
						<ContentText>{el.content}</ContentText>
						<CycleText>{el.cycle}회독 했음</CycleText>
					</ReviewCard>
				</Swipeout>
			);
		});
	};

	render() {
		return (
			<ScreenPageWrapper>
				<ScreenTitleWapper>
					<ScreenTitle>오늘의 복습</ScreenTitle>
				</ScreenTitleWapper>
				<ScrollViewCustom enableEmptySections={true}>
					{this.mapDataToState(this.state.dataList).length !== 0 ? (
						this.mapDataToState(this.state.dataList)
					) : (
						<EmptyNotice>
							<Text>복습할게 없군요?</Text>
							<FamousSaying />
						</EmptyNotice>
					)}
				</ScrollViewCustom>
			</ScreenPageWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(ReviewListScreen);
