import React from 'react';
import Vimeo from '@u-wave/react-vimeo';

import {tvPlaneArr} from '../data/modalInfo';
import imgClose from '../assets/images/close.png';
import imgBack from '../assets/images/arrow-back.png';
import { GetTVModalSize } from '../data/modalInfo';

const typeButtons = [
	{key:'video', label:'VIDEOS', left:1399},
	{key:'pdf', label:'PDFS', left:1550},
	{key:'image', label:'IMAGES', left:1703},
]
const typeButtonPos = [1399, 1550, 1703];
const typeSize = {width:115, height:56, top:245, font:22}, closeSize = {width:40, left:15, top:72};

export default class TVModalComponent extends React.Component {
	constructor(props) {
		super(props);
		const {buttons, title} = tvPlaneArr.find(item=>item.key===props.tvKey);
		// const wWidth = window.innerWidth, wHeight = (wWidth < 1280 || props.browType==='mobile') ? window.innerHeight - 55: window.innerHeight;
		const {cWidth, cHeight, cRate, bRate, bTop, mLeft} = GetTVModalSize(window.innerWidth, window.innerHeight, props.browType); //(wWidth, wHeight);
		this.state = {tvKey:props.tvKey, tvInner:false, buttons, title, cWidth, cHeight, cRate, bRate, bTop, mLeft, selArr:[]}; // :[] props.tvInner
	}

	componentDidMount() {
		// setTimeout(() => {
		// 	this.setState({tvInner:true});
		// }, 500);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.tvInner !== nextProps.tvInner) {
			this.setState({tvInner:nextProps.tvInner});
		}
	}

	onClickSubItem = (item) => {
	}

	onClickClose = () => {
		if (this.state.selType==='video') this.props.setBackSound('mute', false);
		this.props.closeTVModal('tvInner');
		setTimeout(() => {
			this.props.closeTVModal('tvKey');
		}, 500);
	}

	onClickCircleButton = (selButton) => {
		var selTypeArr = [];
		if (selButton) selTypeArr = typeButtons.filter(item=>{return selButton[item.key] !== undefined});
		this.setState({selButton, selTypeArr});
	}

	onClickTypeButton = (selType) => {
		const selArr = this.state.selButton[selType.key];
		this.setState({selType:selType.key, selArr, selNum:0});
		if (selType.key==='video') this.props.setBackSound('mute', true);
	}

	render() {
		const {tvKey, buttons, tvInner, title, cWidth, cHeight, cRate, bRate, bTop, mLeft, selButton, selType, selArr, selNum, selTypeArr} = this.state;
		return (
			<div className={`tv-modal modal-back ${tvKey?'active':''}`}>
				<div className={`modal-wrapper ${tvInner?'active':''}`} style={{width:cWidth+'px', height:(cHeight+35)+'px', maxHeight:(cHeight+40)+'px'}}>
					<div className='modal-title'>{title}</div>
					<div className='close-icon flex' onClick={this.onClickClose}><img src={imgClose}></img></div>
					<div className={`tvPlane tv-modal-plane tvPlane_${tvKey}_main`} id={`tvPlane_${tvKey}_main`} style={{width:cWidth+'px', height:cHeight+'px', marginLeft:mLeft+'px'}}>
						<div className='tv-modal-board flex'>
							<div className='video-back'>
								{this.props.browType==='web'&&<video className={`tvMain${tvKey}`} src={`./videos/kiosk/kiosk_back_${tvKey}.mp4`} muted loop={true} autoPlay="autoplay"></video>}
								{this.props.browType==='mobile'&&<img className={`tvBackImg`} src={`./videos/kiosk/kiosk_back_${tvKey}.jpg`}></img>}
							</div>
							<div className='button-area' style={{transform:'scale('+bRate+')', top:bTop+'px'}}>
								{buttons.map((buttonItem, buttonIdx )=>
									<div className={`tv-button ${buttonItem.classStr}`} id={buttonItem.id} key={buttonIdx} onClick={()=>this.onClickCircleButton(buttonItem)}>
										<div className='circle-inner'><label>{buttonItem.label}</label></div>
										<div className='circle-outer'></div>
									</div>
								)}
							</div>
						</div>
						{selButton &&
							<div className='tv-modal-board' style={{backgroundImage: `url("./images/kiosk-back/${tvKey}/${selButton.id}.jpg")`}}>
								{selTypeArr.map((item, idx )=>
									<div className={`type-button flex`} style={{left:typeButtonPos[idx]*cRate+'px', top:typeSize.top*cRate+'px', width:typeSize.width*cRate+'px', height:typeSize.height*cRate+'px', fontSize:typeSize.font*cRate+'px', borderRadius:7*cRate+'px'}} onClick={()=>this.onClickTypeButton(item)} key={idx}>
										{item.label}
									</div>
								)}
								<div className={`type-close flex ${selType?'':'hover-rotate'}`} style={{left:closeSize.left*cRate+'px', top:closeSize.top*cRate+'px', width:closeSize.width*cRate+'px', height:closeSize.width*cRate+'px'}} onClick={()=>{
									if (selType) {
										if (selType==='video') this.props.setBackSound('mute', false);
										this.setState({selType:null, selArr:[]});
									}
									else this.onClickCircleButton();
								}}><img src={selType?imgBack:imgClose}></img></div>
							</div>
						}
						{selType &&
							<div className='tv-modal-board tv-modal-type-board' style={{}}>
								<div className='type-wrapper flex'>
									<div className='right-content'>
										{selType==='video' && <Vimeo video={selArr[selNum].videoUrl} autoplay controls width={cWidth*11/14} height={cHeight*619/787}></Vimeo>}
										{selType==='pdf' && <iframe src={`${selArr[selNum].pdfUrl}#zoom=FitW`} width='100%' height={'100%'}></iframe>}
										{selType==='image' && <img src={selArr[selNum].imgUrl}></img>}
										{/* height={`${this.contentH}px`}  height={`${cHeight*cRate*0.8333 - 44}px`} */}
									</div>
									<div className='left-list scroll'>
										<div className='list-wrapper'>
											{selArr.map((item, idx )=>
												<img className={`${idx===selNum?'active':''}`} src={item.thumb} key={idx} onClick={()=> this.setState({selNum:idx})}></img>
											)}
										</div>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}
