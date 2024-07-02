import React from 'react';
import axios from 'axios';

import imgMouseSide from '../assets/images/modal/info_mouse_side.svg';
import imgMouseFront from '../assets/images/modal/info_mouse_front.svg';
import imgHandSide from '../assets/images/modal/info_hand_side.png';
import imgHandFront from '../assets/images/modal/info_hand_front.png';
import imgKeySPeaker from '../assets/images/header/info_speaker.png';
import imgArror from '../assets/images/header/arrow_next.svg';
import imgHotspot from '../assets/images/canvas/hotspot.png';

import imgClose from '../assets/images/close.png';

import { baseUrl } from '../data/config';

var generalArr = [
	{img:imgArror, label:'Navigate around the booth by selecting the area in the navigation bar above.', classStr:'icon arrow'},
	{img:imgHotspot, label:'Click hotspots to learn more', classStr:'icon hotspot'},
	{img:imgMouseSide, label:'Clicking and dragging your mouse left will move the camera left, if you click and drag right, the view will look to the right'},
	{img:imgMouseFront, label:'Clicking and dragging your mouse up it will move the camera view up, if you click and drag down, the view will look downwards'},
	{img:imgKeySPeaker, label:'Clicking this icon will give you access to sound control'},
]
const manInfo = [
	{key:'firstName', label:'First name', val:''},
	{key:'lastName', label:'Last name', val:''},
	{key:'companyName', label:'Company', val:''},
	{key:'address', label:'Address', val:''},
	{key:'city', label:'City', val:''},
	{key:'state', label:'State', val:''},
	{key:'country', label:'Country', val:''},
]
const productInfo = [
	{mainKey:'life',  label:'Life', subArr:[{subKey:'health', subLabel:'HealthCam'}, {subKey:'touch', subLabel:'Touchless Elevator Panel'}, {subKey:'condition', subLabel:'Air Conditioning'}, {subKey:'building', subLabel:'Integrated Buildings'}]},
	{mainKey:'industry',  label:'Industry', subArr:[{subKey:'robot', subLabel:'RoboTire'}, {subKey:'factory', subLabel:'E-Factory'}]},
	{mainKey:'structure',  label:'Infrastructure', subArr:[{subKey:'power', subLabel:'Power-I'}, {subKey:'smater', subLabel:'Smarter Grid Solutions'}, {subKey:'seamless', subLabel:'Seamless Security Checkpoint'}, {subKey:'radar', subLabel:'Radar-based Subsurface Imaging'}]},
	{mainKey:'mobility',  label:'Mobility', subArr:[{subKey:'autonomous', subLabel:'Autonomous Driving'}, {subKey:'assistance', subLabel:'Driving Assistance / Crew Watch'}, {subKey:'electric', subLabel:'Electrification'}, {subKey:'inverter', subLabel:'Inverter and Motor'}, {subKey:'robot', subLabel:'Multipurpose Mobility Robot'}]}
]

export default class InfoModalComponent extends React.Component {
	constructor(props) {
		super(props);
		if (props.browType==='mobile') {
			generalArr[2].img = imgHandSide; generalArr[3].img = imgHandFront;
		}
		this.state = {infoModal:props.infoModal, infoInner:props.infoInner, modalType:props.modalType, productInfo, device: props.device};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.infoModal !== nextProps.infoModal) {
			this.setState({infoModal:nextProps.infoModal});
		}
		if (this.state.infoInner !== nextProps.infoInner) {
			this.setState({infoInner:nextProps.infoInner});
		}
		if (this.state.device !== nextProps.device) {
			this.setState({device:nextProps.device});
		}
		if (this.state.modalType !== nextProps.modalType) {
			this.setState({modalType:nextProps.modalType});
		}
	}

	onSubmitContact = () => {
		const {device, helpStr} = this.state;
		if (!device || !helpStr || helpStr === '') return;
		var bodyFormData = new FormData();
		bodyFormData.append('device_type', device.type);
		bodyFormData.append('device_id', device.id);
		bodyFormData.append('user_id', '');
		bodyFormData.append('bearer_token', device.token);
		bodyFormData.append('subject', '');
		bodyFormData.append('message', helpStr);
		this.props.setLoading(true);
		axios.post(baseUrl+"/api/contactus", bodyFormData, {
			headers: { 'Authorization': `Bearer ${device.token}`}
		}).then((res) => {
			this.props.setLoading(false);
			this.onCloseInfoModal();
		}, (e) => {
			window.alert('Failed to submit your contact!');
			this.props.setLoading(false);
		});
	}

	onCloseInfoModal = () => {
		this.setState({modalType:'info'});
		this.props.closeInfoModal('infoInner')
		setTimeout(() => {
			this.props.closeInfoModal('infoModal')
		}, 500);
	}

	render() {
		const {infoModal, infoInner, modalType, productInfo, helpStr} = this.state;
		return (
			<div className={`info-modal modal-back ${infoModal?'active':''}`}>
				<div className={`modal-wrapper flex-part ${infoInner?'active':''} ${modalType}-wrapper`}>
					<div className='modal-title'>{modalType==='info'?'Info':'Contact Us'}</div>
					<div className={`content ${modalType}`}>
						{modalType==='info' &&
							<>
								{generalArr.map((item, idx )=>
									<div className={`info-item`} key={idx}>
										<div className={`info-image ${item.title?'top':''}`}><img src={item.img} className={item.classStr}></img></div>
										<div className='info-label'>
											<label className={`${item.title?'title':''}`} >{item.label}</label>
										</div>
									</div>
								)}
							</>
						}
						{modalType==='contact'&&
							<>
								<div className='contact-side'>
									<div className='side-title'><label>Product of interest </label><span> (check all that apply)</span></div>
									<div className='side-content'>
										<div className='side-wrapper scroll'>
											{productInfo.map((mainItem, mainIdx )=>
												<div className={`main-item`} key={mainIdx}>
													<div className='main-label'>{mainItem.label}</div>
													{mainItem.subArr.map((subItem, subIdx )=>
														<div className={`sub-item`} key={subIdx}>
															<div className='sub-label'>{subItem.subLabel}</div>
															<div><input type={'checkbox'}></input></div>
														</div>
													)}
												</div>
											)}
										</div>
									</div>
								</div>
							</>
						}
					</div>

					<div className='close-icon flex-part' onClick={this.onCloseInfoModal}>
						<img src={imgClose}></img>
					</div>
					{modalType==='contact'&&
						<div className='contact-footer flex'>
							<div className='links'>
								<label className='policy' onClick={() => {
									const newTab = window.open('https://us.mitsubishielectric.com/en/privacy-policy/index.html', '_blank');
									newTab.focus();
								}}>Privacy Policy</label> and <label onClick={() => {
									const newTab = window.open('https://www.mitsubishielectric.com/en/cookie-gateway/cookies.html', '_blank');
									newTab.focus();
								}}>Cookies Policy</label> links
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}
