import React from 'react';
import axios from 'axios';
import jQuery from 'jquery';
import LoginComponent from './Login';
import CanvasComponent from './Canvas';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import InfoModalComponent from './InfoModal';
import MultiModalComponent from './MultiModal';
import SubModalComponent from './SubModal';
import LoadingComponent from './Loading';
import SideRightComponent from './SideRight';
import TVModalComponent from './TVModal';
import { baseUrl, GetDeviceInfo } from '../data/config';
import soundBack from '../assets/video/back_sound_cut.mp3';

import '../assets/css/index.css';
import { sceneArr } from '../data/model';

const skipTest = false;
const browType = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? 'mobile':'web';
const iOSType = ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform)|| (navigator.userAgent.includes("Mac") && "ontouchend" in document)

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		// const device = ( window.innerHeight > window.innerWidth || window.innerWidth < 1280 ) ? 'mobile':'web';
		this.stayTime = -1;
		this.state = {pageKey:'canvas', loadPro: 0, selScene:'', speaker:true, volume:0.5 }; // , device
	}

	componentDidMount() {
		this.setCanvasSize();
		window.addEventListener('resize', this.setCanvasSize);
		this.setState({loading:true, loadPro:0});
		jQuery('.render-2d').click(e=>{
			const hotButton = jQuery(e.target).closest('.tv-hot-button')[0];
			if (hotButton) {
				const hotKey = hotButton.id.substring(11);
				this.openObjectModal('tv', hotKey);
			}
		});
		this.setBackVolume(0.5);
		this.getDeviceToken();
		setInterval(() => { if (this.stayTime >= 0) this.stayTime++; }, 1000);
		jQuery(window).focus(()=> { this.setBackSound('mute', false); });
		jQuery(window).blur(()=> { this.setBackSound('mute', true); });
		window.addEventListener('click', ()=> {
			if (this.firstClick) return;
			this.firstClick = true;
			this.setBackSound('play', true);
		})
	}

	setCanvasSize = () => {
		this.setState({portrait:window.innerHeight>window.innerWidth});
		if (window.innerWidth < window.innerHeight) {
			jQuery('#container').css({display:'none'});
			jQuery('.modal-back').css({display:'none'});
		} else {
			jQuery('#container').css({display:'initial'});
			jQuery('.modal-back').css({display:'flex'});
		}
	}

	getDeviceToken = () => {
		const device = GetDeviceInfo(), secret_key = '402620C92552D9303C58B901B43B0A41718E772C19520DD9A9AA52CE5A8FCB99';
		var bodyFormData = new FormData();
		bodyFormData.append('secret_key', secret_key);
		bodyFormData.append('device_type', device.type);
		bodyFormData.append('device_id', device.id);
		bodyFormData.append('push_token', '');
		axios.post(baseUrl+"/api/guestToken", bodyFormData).then((res) => {
			const {data} = res;
			if (!data || !data.data || !data.data.token) {
				window.alert('Failed to get token api response');
			} else {this.setState({device:{...device, token:data.data.token}});}
		}, (e)=> window.alert('Failed to get token api response'));
	}

	setLoadPro = (loadArr, type) => {
		var totalLoaded = 0, loaded = 0, totalConverted = 0, converted = 0, totalVal = 0, loadedVal = 0;
		loadArr.forEach(item => {
			if (type==='load') {totalLoaded += item.total; loaded += item.loaded;}
			else {totalConverted += item.total; converted += item.converted;}
		});
		totalVal = totalLoaded + totalConverted; loadedVal = loaded + converted;
		if (!totalVal) return;
		const loadPro = Math.round(loadedVal/totalVal*100);
		this.setState({loadPro}, () => {
			if (loadPro < 100) return;
			setTimeout(() => { this.setState({loading:false}); }, 1000);
			setTimeout(() => { this.setState({loadPro:undefined}); }, 2000);
		});
	}

	openObjectModal = (hotType, hotKey) => {
		if (hotType==='multi') this.setState({multiKey:hotKey}, ()=>this.setState({multiInner:true}));
		else if (hotType==='sub') this.setState({subKey:hotKey}, ()=>this.setState({subInner:true}));
		else if (hotType==='tv') this.setState({tvKey:hotKey}, ()=>
			{setTimeout(() => { this.setState({tvInner:true}) }, 100);}
		);
	}

	setBackSound = (type, val) => {
		const soundDiv = document.getElementById('backSound');
		if (type==='play') {
			if (soundDiv) {
				if (val) soundDiv.play(); else soundDiv.pause();
			}
			this.setState({speaker:val});
		} else if (type==='mute') {
			if (soundDiv) soundDiv.muted = val;
		}
	}

	setNewScene = (newScene) => {
		this.stayTime = 0;
		this.setState({selScene:newScene});
	}

	setBackVolume = (volume) => {
		this.setState({volume});
		const soundDiv = document.getElementById('backSound');
		if (soundDiv) soundDiv.volume = volume;
	}

	render() {
		const {pageKey, device, selPos, loadPro, infoModal, infoInner, multiKey, multiInner, subKey, subInner, tvKey, tvInner, loading, selScene, speaker, showFirst, volume, portrait, infoModalType} = this.state;
		return (
			<div className={`page-wrapper ${browType} ${iOSType?'iOS':''} ${pageKey}-page`}>
				<CanvasComponent
					pageKey={pageKey}
					selScene={selScene}
					loading={loading}
					browType={browType}
					iOSType={iOSType}
					callPage={(pageKey)=>this.setState({pageKey})}
					setLoadPro={(loadArr)=>this.setLoadPro(loadArr, 'load')}
					setConvertPro={(convertArr)=>this.setLoadPro(convertArr, 'convert')}
					openObjectModal={this.openObjectModal}
					setLoading={(loading, loadPro)=>this.setState({loading, loadPro})}
					setSelScene={this.setNewScene}
				></CanvasComponent>
				<HeaderComponent
					pageKey={pageKey}
					selScene={selScene}
					skipTest={skipTest}
					browType={browType}
					callPage={(pageKey)=>this.setState({pageKey})}
					setLoading={(loading)=>this.setState({loading, loadPro:false})}
					setSelScene={this.setNewScene}
					openInfoModal={(infoModalType)=>this.setState({infoModal:true, infoModalType}, ()=>this.setState({infoInner:true}))}
				></HeaderComponent>
				<SideRightComponent
					pageKey={pageKey}
					browType={browType}
					openContactModal={()=>this.setState({infoModal:true, infoModalType:'contact'}, ()=>this.setState({infoInner:true}))}
				></SideRightComponent>
				<FooterComponent
					pageKey={pageKey}
					speaker={speaker}
					volume={volume}
					setVolume={this.setBackVolume}
					setSpeaker={()=>{this.setBackSound('play', !speaker)}}
				></FooterComponent>
				<InfoModalComponent
					infoModal={infoModal}
					infoInner={infoInner}
					browType={browType}
					device={device}
					modalType={infoModalType}
					closeInfoModal={(key)=>this.setState({[key]:false})}
					setLoading={(loading, loadPro)=>this.setState({loading, loadPro})}
					setModalType={(infoModalType)=>this.setState({infoModalType})}
				></InfoModalComponent>
				<MultiModalComponent
					multiKey={multiKey}
					multiInner={multiInner}
					subKey={subKey}
					// openObject={(val)=>this.setState({selObject:val}, ()=>this.setState({objectInner:true}))}
					openObjectModal={this.openObjectModal}
					closeMultiModal={(key)=>this.setState({[key]:false})}
				></MultiModalComponent>
				{tvKey &&
					<TVModalComponent
						tvKey={tvKey}
						tvInner={tvInner}
						browType={browType}
						closeTVModal={(key)=>this.setState({[key]:false})}
						setBackSound={this.setBackSound}
					></TVModalComponent>
				}
				<SubModalComponent
					multiKey={multiKey}
					subKey={subKey}
					subInner={subInner}
					closeSubModal={(key)=>{ this.setState({[key]:false}); }}
					setBackSound={this.setBackSound}
				></SubModalComponent>
				<LoadingComponent
					pageKey={pageKey}
					loading={loading}
					loadPro={loadPro}
				></LoadingComponent>
				<audio id='backSound' loop>
					<source src={soundBack} type="audio/mpeg"></source>
				</audio>
				{portrait &&
					<div className='back-board portrait flex'>
						Please use your device in landscape mode
					</div>
				}
			</div>
		);
	}
}
