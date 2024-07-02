import React from 'react';
import axios from 'axios';

import imgLogo from '../assets/images/logo.svg';
import {ReactComponent as SvgLogo} from '../assets/images/logo.svg';
import {ReactComponent as SvgInfo} from '../assets/images/header/info.svg';
import {ReactComponent as SvgArrowBack} from '../assets/images/header/arrow_back.svg';
import {ReactComponent as SvgArrowNext} from '../assets/images/header/arrow_next.svg';

import { sceneArr } from '../data/model';
import { baseUrl } from '../data/config';

export default class HeaderComponent extends React.Component {
	constructor(props) {
		super(props);
		this.menuArr = sceneArr.filter(item=>{return item.menuLabel !== undefined});
		this.testArr = sceneArr.filter(item=>{return item.menuLabel === undefined});
		this.state = {pageKey:props.pageKey, selScene:props.selScene, speaker:props.speaker};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey})
		}
		if (this.state.selScene !== nextProps.selScene) {
			const subInfo = sceneArr.find(item=>{return item.key === nextProps.selScene}).subInfo;
			this.setState({selScene:nextProps.selScene, subInfo});
		}
	}

	onClickSceneItem = (itemKey) => {
		if (this.state.selScene===itemKey) return;
		// if (itemKey==='exterior') return;
		this.props.setSelScene(itemKey);
	}

	onClickHome = () => {
		const logoUrl = 'https://us.mitsubishielectric.com/en/';
		const newTab = window.open(logoUrl, '_blank');
		newTab.focus();
		// this.props.callPage('login');
	}

	onClickArrow = (delta) => {
		const {subInfo, selScene} = this.state, {subArr} = subInfo, selIdx = subArr.findIndex(item => {return item === selScene});
		var targetScene;
		if (selIdx === 0 && delta === -1) targetScene = subArr[subArr.length - 1];
		else if (selIdx === subArr.length - 1 && delta === 1) targetScene = subArr[0];
		else targetScene = subArr[selIdx + delta];
		this.props.setSelScene(targetScene);
	}
	render() {
		const {pageKey, selScene, disableBack, disableNext, subInfo} = this.state;
		const menuItem = sceneArr.find(item=>{return item.key===selScene});
		const menuKey = menuItem? menuItem.menuKey:'';
		return (
			<div className={`header ${pageKey==='canvas'?'':'hidden'} flex`}>
				<div className='header-wrapper'>
					<div className='header-left header-part' onClick={this.onClickHome}><SvgLogo></SvgLogo></div>
					<div className='header-middle header-part'>
						<div className='country-label'>United States</div>
						{this.menuArr.map((item, idx) =>
							<div className={`scene-item flex ${menuKey===item.key?'active':''}`} key={idx}>
								<label className='scene-label' onClick={()=>this.onClickSceneItem(item.key)}>{item.menuLabel}</label>
								{subInfo && subInfo.menuKey === item.key &&
									<div className={`tri-wrapper`}>
										<div className={`circle-icon tri-back`} onClick={()=>this.onClickArrow(-1)}><SvgArrowBack></SvgArrowBack></div> {/* ${disableBack?'disable':''} */}
										<div className={`circle-icon tri-next`} onClick={()=>this.onClickArrow(1)}><SvgArrowNext></SvgArrowNext></div> {/* ${disableNext?'disable':''} */}
									</div>
								}
							</div>
						) }
						{this.props.browType==='web' &&
							<div className={`scene-item flex`}>
								<label className='scene-label' onClick={()=>this.props.openInfoModal('contact')}>Contact Us</label>
							</div>
						}
					</div>
					<div className='header-right header-part'>
						<div className='circle-icon' onClick={()=>this.props.openInfoModal('info')}><SvgInfo></SvgInfo></div>
					</div>
				</div>
			</div>
		);
	}
}
