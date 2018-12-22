import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { View, RefreshControl, ActivityIndicator, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import API from '../API';
import { ScreenTitleWapper, ScreenTitle } from './ReviewListScreen';

let dataFormat = {};

class TimeLineScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor() {
		super();
		this.onEndReached = this.onEndReached.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
		this.renderDetail = this.renderDetail.bind(this);

		this.data = [];

		this.state = {
			isRefreshing: false,
			waiting: false,
			offset: 0,
			isDataRemain: true,
			data: this.data
		};
	}

	convertDataFormat = (data) => {
		for (let item of data) {
			const date = item.createdAt.slice(0, 10);
			if (!dataFormat[date]) {
				dataFormat[date] = {};
				dataFormat[date].title = [];
				dataFormat[date].description = [];
			}
			dataFormat[date].time = date;
			dataFormat[date].title.push(item.title);
			dataFormat[date].description.push(item.content);
		}
		const tempDatas = [];
		for (let item in dataFormat) {
			const format = {
				time: '',
				title: [],
				description: []
			};
			format['time'] = dataFormat[item].time;
			format['title'] = dataFormat[item].title;
			format['description'] = dataFormat[item].description;
			tempDatas.push(format);
		}
		dataFormat = {};
		return tempDatas;
	};

	async componentDidMount() {
		try {
			const { data } = await API.get(`study/all/${this.state.offset}`, {
				headers: {
					'auth-header': this.props.user.token
				}
			});
			const toBeAddDatas = this.convertDataFormat(data.stories);
			this.setState({
				offset: this.state.offset + 20,
				data: toBeAddDatas,
				isDataRemain: data.isDataRemain
			});
		} catch (error) {
			console.log(error);
		}
	}

	onRefresh = async () => {
		this.setState({ isRefreshing: true });
		//refresh to initial data
		try {
			const { data } = await API.get(`study/all/0`, {
				headers: {
					'auth-header': this.props.user.token
				}
			});
			const newData = this.convertDataFormat(data.stories);
			this.setState({
				data: newData,
				offset: 20,
				isRefreshing: false,
				isDataRemain: data.isDataRemain
			});
		} catch (error) {
			console.log(error);
		}
	};

	renderFooter = () => {
		if (this.state.waiting) {
			return <ActivityIndicator />;
		} else {
			return (
				<View style={{ backgroundColor: 'black', height: 100 }}>
					<Text>this is end</Text>
					<Text>this is end</Text>
				</View>
			);
		}
	};

	onEndReached = async () => {
		if (!this.state.isDataRemain) {
			return;
		}
		if (!this.state.waiting) {
			this.setState({ waiting: true });
			//fetch and concat data
			try {
				const { data } = await API.get(
					`study/all/${this.state.offset}`,
					{
						headers: {
							'auth-header': this.props.user.token
						}
					}
				);

				const toBeAddDatas = this.state.data.concat(
					this.convertDataFormat(data.stories)
				);
				this.setState({
					waiting: false,
					offset: this.state.offset + 20,
					data: toBeAddDatas,
					isDataRemain: data.isDataRemain
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	mapToOneDayData = (data) => {
		return data.title.map((el, index) => {
			return (
				<View key={index}>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 'bold'
						}}
					>
						{el}
					</Text>
					<Text
						style={{
							marginLeft: 5,
							marginBottom: 10,
							color: 'gray'
						}}
					>
						{data.description[index]}
					</Text>
				</View>
			);
		});
	};

	renderDetail(rowData, sectionID, rowID) {
		return <View style={{ flex: 1 }}>{this.mapToOneDayData(rowData)}</View>;
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					padding: 20,
					paddingTop: 30,
					backgroundColor: 'white'
				}}
			>
				<ScreenTitleWapper>
					<ScreenTitle>나의 공부</ScreenTitle>
				</ScreenTitleWapper>
				<Timeline
					style={{
						flex: 1,
						minHeight: '100%',
						marginTop: 30,
						paddingTop: 10,
						paddingBottm: 50,
						marginBottom: 100
					}}
					data={this.state.data}
					circleSize={20}
					circleColor="rgb(45,156,219)"
					lineColor="rgb(45,156,219)"
					timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
					timeStyle={{
						textAlign: 'center',
						backgroundColor: '#ff9797',
						color: 'white',
						padding: 5,
						borderRadius: 13
					}}
					// showTime={false}
					descriptionStyle={{ color: 'gray' }}
					options={{
						style: { paddingTop: 5 },
						refreshControl: (
							<RefreshControl
								refreshing={this.state.isRefreshing}
								onRefresh={this.onRefresh}
							/>
						),
						renderFooter: this.renderFooter,
						onEndReached: this.onEndReached
					}}
					renderDetail={this.renderDetail}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps)(TimeLineScreen);
