import React from 'react';
import axios from 'axios';
import jQuery from 'jquery';

import {ReactComponent as SvgLinkedin} from '../assets/images/footer/footer_Linkedin.svg';
import {ReactComponent as SvgTwitter} from '../assets/images/footer/footer_Twitter.svg';
import {ReactComponent as SvgYoutube} from '../assets/images/footer/footer_Youtube.svg';
import {ReactComponent as SvgFacebook} from '../assets/images/footer/footer_Facebook.svg';
import {ReactComponent as SvgInstagram} from '../assets/images/footer/footer_Instagram.svg';
import {ReactComponent as SvgArrow} from '../assets/images/footer/arrow.svg';
import {ReactComponent as SvgChevron} from '../assets/images/footer/chevron.svg';
import {ReactComponent as SvgSpeaker} from '../assets/images/header/speaker.svg';
import { baseUrl } from '../data/config';

const rightArr = [
	{key:'term', label:'Terms of Use', url:'terms'},
	{key:'policy', label:'Privacy Policy', url:'privacy-policy'},
	{key:'cook', label:'Cookies', url:'privacy/cookies'},
	{key:'sitemap', label:'Sitemap', url:'sitemap'},
]

const iconArr = [
	{key:'linkedin', url:'https://www.linkedin.com/company/mitsubishi-electric-us-inc-?'},
	{key:'twitter', url:'https://twitter.com/Mitsubishi_USA'},
	{key:'youtube', url:'https://www.youtube.com/user/MEUSCorp'},
	{key:'facebook', url:'https://www.facebook.com/mitsubishielectricus/?fref=nf'},
	{key:'instagram', url:'https://www.instagram.com/mitsubishielectricus/?hl=en'},
	{key:'chevron'}
]

export default class FooterComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {pageKey:props.pageKey, device:props.device, expand:false, speaker:props.speaker, volume:props.volume};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
		if (this.state.speaker !== nextProps.speaker) {
			this.setState({speaker:nextProps.speaker});
		}
		if (this.state.volume !== nextProps.volume) {
			this.setState({volume:nextProps.volume});
		}
	}

	onClickLinkItem = (urlStr) => {
		if (!urlStr) return;
		const newTab = window.open(urlStr, '_blank');
		newTab.focus();
	}

	render() {
		const {pageKey, expand, speaker, volume} = this.state;
		return (
			<div className={`footer ${pageKey==='canvas'?'':'hide'} ${expand?'expand':''}`}>
				<div className={`footer-expand flex`}>
					<div className='footer-expand-wrapper'>
						<div className='expand-title'>Follow us</div>
						<div className='expand-bottom'>
							<div className='expand-icons'>
								{iconArr.map((item, idx )=>
									<div className={`expand-icon`} key={idx} onClick={()=>this.onClickLinkItem(item.url)}>
										{item.key==='linkedin' && <SvgLinkedin></SvgLinkedin>}
										{item.key==='twitter' && <SvgTwitter></SvgTwitter>}
										{item.key==='youtube' && <SvgYoutube></SvgYoutube>}
										{item.key==='facebook' && <SvgFacebook></SvgFacebook>}
										{item.key==='instagram' && <SvgInstagram></SvgInstagram>}
										{item.key==='chevron' && <SvgChevron className='chevron'></SvgChevron>}
									</div>
								)}
							</div>
							<div className='icon-label'> Social media approved accounts</div>
						</div>
					</div>
					<div className='footer-inner-wrapper'>
						<small className='mitsubishi-label'>© Mitsubishi Electric Corporation</small>
						<div className='right-part'>
							{rightArr.map((item, idx )=>
								<div className={`right-item`} key={idx} onClick={()=>this.onClickLinkItem('https://us.mitsubishielectric.com/en/'+item.url+'/index.html')}>{item.label}</div>
							)}
						</div>
					</div>
					<div className={'expand-arrow'} onClick={()=>this.setState({expand:!expand})}>
						<SvgArrow></SvgArrow>
					</div>
					<div className='sound-outer flex'>
						<div className='sound-wrapper flex'>
							<div className='circle-icon' onClick={this.props.setSpeaker}>
								<SvgSpeaker className={`speak-svg ${speaker?'':'mute'}`}></SvgSpeaker>
							</div>
						</div>
						<input type="range" id="backVolume" min="0" max="1" value={volume} step="0.05" onChange={(e)=>{
							const val = parseFloat(e.target.value);
							this.props.setVolume(val);
							jQuery('head').append('<style>#backVolume:before{width:'+val*100+'% !important;}</style>');
						}}></input>
					</div>
				</div>
			</div>
		);
	}
}
