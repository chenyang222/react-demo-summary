import React from 'react';
import {Row, Col} from 'antd';

import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		};	
		this.componentDidMount = this.componentDidMount.bind(this);	
	};
	
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		
		let uniquekey = this.props.location.pathname.split('/')[2];

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({newsItem: json});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台";
		})
	};
	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	};
	render() {
		return (
			<div id='mobileDetailsContainer'>
				<MobileHeader/>
				<div class="ucmobileList">
					<Row>
						<Col span={24} className="container">
							<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						</Col>
					</Row>
				</div>
				<MobileFooter/>
			</div>
		);
	};
}
