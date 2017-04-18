import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter
} from 'react-router-dom';

import PCIndex from './pcindex';
import MobileIndex from './mobileindex.js';
import MediaQuery from 'react-responsive';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
export default class Root extends React.Component{

	render(){
		return(
			<HashRouter>	
				<div>
					<MediaQuery query = '(min-device-width: 1224px)'>		
						<Route exact path="/" component={PCIndex} />
						<Route path="/details/:uniquekey" component={PCNewsDetails}/>
					</MediaQuery>
					<MediaQuery query = '(max-device-width: 1224px)'>			
						<Route exact path="/" component={MobileIndex} />
						<Route path="/details/:uniquekey" component={MobileNewsDetails}/>						
					</MediaQuery>				
				</div>
			</HashRouter>
		)
	}
	
}

ReactDOM.render(
	<Root />,
	document.getElementById('mainContainer')
)
