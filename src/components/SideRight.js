import React from 'react';
import axios from 'axios';

import {ReactComponent as SvgInfo} from '../assets/images/header/info.svg';
import imgLogo0 from '../assets/images/header/logo_0.png';

export default class SideRightComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, menuKey:'main', selScene:props.selScene, disableBack:true, disableNext:false};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey})
		}
	}

	onClickLogo0 = () => {
		const newUrl = 'https://www.ces.tech/';
		const newTab = window.open(newUrl, '_blank');
		newTab.focus();
	}

	render() {
		const {pageKey} = this.state;
		return (
			<>
				<div className={`side-logo ${pageKey==='canvas'?'':'hidden'}`}>
					{this.props.browType==='mobile' && <div className='contact-us' onClick={this.props.openContactModal}>Contact Us</div>}
					{/* <div className='contact-us' onClick={this.onClickLogo0}> {`EXPLORE CES® 2022   `} &nbsp;&nbsp;&nbsp; {`>`} </div> */}
				</div>
				{/* <div className={`side-right flex ${pageKey==='canvas'?'':'hidden'}`}>
					<div className='circle-icon'><SvgInfo></SvgInfo></div>
				</div> */}
			</>
		);
	}
}
