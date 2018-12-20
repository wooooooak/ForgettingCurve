import React from 'react';
import { View, RefreshControl, ActivityIndicator, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';

export default class TimeLineScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor() {
		super();
		this.onEndReached = this.onEndReached.bind(this);
		this.renderFooter = this.renderFooter.bind(this);
		this.onRefresh = this.onRefresh.bind(this);
		this.renderDetail = this.renderDetail.bind(this);

		this.data = [
			{
				time: '2018-12-20',
				title: [ '영어 단어', '깃 공부' ],
				description: [ '챕터 3 공부', '깃 설정 공부' ],
				lineColor: '#009688'
			},
			{
				time: '2018-12-20',
				title: [ '깃 공부' ],
				description: [ 'a shuttlecock across a net.' ],
				lineColor: '#009688'
			},
			{
				time: '2018-12-19',
				title: [ '영어 단어' ],
				description: [ '챕터 2 공부', '두 번째 공부' ]
			}
		];

		this.state = {
			isRefreshing: false,
			waiting: false,
			data: this.data
		};
	}

	onRefresh = () => {
		console.log('onRefresh~!~!~!~!');
		this.setState({ isRefreshing: true });
		//refresh to initial data
		setTimeout(() => {
			//refresh to initial data
			this.setState({
				data: this.data,
				isRefreshing: false
			});
		}, 2000);
	};

	renderFooter = () => {
		if (this.state.waiting) {
			return <ActivityIndicator />;
		} else {
			return <Text>~~</Text>;
		}
	};

	onEndReached = () => {
		console.log('onEndeReaCHED~!~!~####');
		if (!this.state.waiting) {
			this.setState({ waiting: true });

			//fetch and concat data
			setTimeout(() => {
				//refresh to initial data
				const data = this.state.data.concat([
					{
						time: '2018-12-19',
						title: [ 'Load more data', '인생 공부' ],
						description: [
							'append event at bottom of timeline',
							'인생 공부했음'
						]
					},
					{
						time: '2018-12-19',
						title: [ 'Load more data' ],
						description: [ 'append event at bottom of timeline' ]
					},
					{
						time: '2018-12-19',
						title: [ 'Load more data' ],
						description: [ 'append event at bottom of timeline' ]
					},
					{
						time: '2018-12-18',
						title: [ 'Load more data' ],
						description: [ 'append event at bottom of timeline' ]
					},
					{
						time: '2018-12-18',
						title: [ 'Load more data' ],
						description: [ 'append event at bottom of timeline' ]
					}
				]);

				this.setState({
					waiting: false,
					data: data
				});
			}, 1000);
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
		let title = (
			<Text
				style={{
					fontSize: 16,
					fontWeight: 'bold'
				}}
			>
				{rowData.title}
			</Text>
		);
		var desc = null;
		if (rowData.description)
			desc = (
				<View
					style={{
						flexDirection: 'row',
						paddingRight: 50
					}}
				>
					<Text
						style={{
							marginLeft: 10,
							color: 'gray'
						}}
					>
						{rowData.description}
					</Text>
				</View>
			);

		return <View style={{ flex: 1 }}>{this.mapToOneDayData(rowData)}</View>;
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					padding: 20,
					paddingTop: 65,
					backgroundColor: 'white'
				}}
			>
				<Timeline
					style={{
						flex: 1,
						marginTop: 30,
						paddingTop: 10
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
