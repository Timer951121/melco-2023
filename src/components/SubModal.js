import React from 'react';
import Vimeo from '@u-wave/react-vimeo';

import {subItemArr} from '../data/modalInfo';

import {ReactComponent as SvgArrow} from '../assets/images/modal/arrow.svg';
import imgClose from '../assets/images/close.png';
import imgChevron from '../assets/images/chevron_red.png';
import imgSliderArrowBack from '../assets/images/modal/slider-arrow-back.png';
import imgSliderArrowNext from '../assets/images/modal/slider-arrow-next.png';

export default class SubModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.stayTime = -1;
		this.state = {subKey:props.subKey, multiKey:props.multiKey, subInner:props.subInner, title:'', rowArr:[], selNum: 0, contentW:1400, contentH:780};
	}

	componentDidMount() {
		this.setModalSize();
		window.addEventListener('resize', this.setModalSize);
		setInterval(() => { if (this.stayTime >=0) this.stayTime++; }, 1000);
	}

	setModalSize = () => {
		if (window.innerWidth < window.innerHeight) return;
		const wHeight = window.innerHeight, wWidth = window.innerWidth;
		if (wHeight > wWidth) return;
		var contentH = wHeight > 900 ? 780 : wHeight - 120;
		var contentW = wWidth > 1520 ? 1400 : wWidth - 120;
		if (this.props.browType==='mobile') { // wWidth < 1280 || 
			contentW = wWidth - 30;
			contentH = wHeight - 105;
		}
		this.setState({contentW, contentH})
	}

	callSectionAPI = () => {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.subKey !== nextProps.subKey) {
			var type, pdfUrl, imgUrl, videoUrl, title, label, subTitle, imgArr = [], cWidth = 0;
			const selItem = subItemArr.find(item=>item.key===nextProps.subKey);
			if (selItem) {
				type = selItem.type;
				imgUrl = selItem.imgUrl;
				videoUrl = selItem.videoUrl;
				pdfUrl = selItem.pdfUrl;
				title = selItem.title;
				label = selItem.label;
				imgArr = selItem.imgArr;
				subTitle = selItem.subTitle;
				cWidth = this.modalWrapper.offsetWidth - 30;
				this.stayTime = videoUrl?0:-1;
			}
			this.setState({subKey:nextProps.subKey, type, pdfUrl, imgUrl, videoUrl, title, label, imgArr, subTitle, selNum:0, cWidth});
			if (videoUrl) this.props.setBackSound('mute', true);
		}
		if (this.state.subInner !== nextProps.subInner) {
			this.setState({subInner:nextProps.subInner});
		}
		if (this.state.multiKey !== nextProps.multiKey) {
			this.setState({multiKey:nextProps.multiKey});
		}
	}

	onClickClose = (type) => {
		this.props.closeSubModal('subInner');
		const {multiKey, subKey, title} = this.state, delayTime = multiKey?0:500;
		setTimeout(() => {
			if (subKey==='introvideo') this.props.setBackSound('play', true);
			this.props.closeSubModal('subKey');
			this.props.setBackSound('mute', false);
			this.stayTime = -1;
		}, delayTime);
		if (type!=='multi')  return;
		setTimeout(() => {this.props.closeSubModal('multiInner') }, 500);
		setTimeout(() => {this.props.closeSubModal('multiKey') }, 1000);
	}

	onClickSliderArrow = (dir) => {
		const {selNum, imgArr} = this.state, nextNum = selNum+dir;
		if (nextNum < 0 || nextNum >= imgArr.length) return;
		this.setState({selNum:nextNum});
	}

	render() {
		const {multiKey, subKey, subInner, type, pdfUrl, videoUrl, imgUrl, title, label, imgArr, subTitle, selNum, cWidth, contentW, contentH} = this.state;
		return (
			<div className={`sub-modal modal-back ${subKey?'active':''} ${multiKey?'multi-sub-modal':''}`}>
				<div className={`modal-wrapper ${subInner?'active':''}`} ref={(ref) => this.modalWrapper = ref}>
					<div className={`modal-title ${multiKey?'multi-sub-title':''}`}>{title}</div>
					{type === 'pdf' &&
						<div className='pdf-content'>
							<iframe src={`${pdfUrl}#zoom=FitW`} width='100%' height={`${contentH}px`}></iframe>
						</div>
					}
					{type === 'label' &&
						<div className='label-content'>{label}</div>
					}
					{type === 'image' &&
						<div className='main-image flex'>
							<img src={imgUrl} style={{maxHeight:contentH+'px', maxWidth:contentW+'px'}}></img>
						</div>
					}
					{type === 'power' &&
						<div className='slider-content' style={{height:contentH+'px'}}>
							<div className='slider-wrapper' style={{width:(cWidth-40)*imgArr.length+ 'px', transform:'translateX(-'+selNum*(cWidth-40)+'px)'}} id='slderWrapper'>
								{imgArr.map((imgUrl, idx )=>
									<div className='slider-item' key={idx} style={{width:(cWidth-40)+'px', height:contentH+'px'}}>
										<img src={imgUrl}></img>
									</div>
								)}
							</div>
							<div className={`slider-arrow arrow-back flex ${selNum===0?'disable':''}`} onClick={()=>this.onClickSliderArrow(-1)}><img src={imgSliderArrowBack}></img></div>
							<div className={`slider-arrow arrow-next flex ${selNum===imgArr.length-1?'disable':''}`} onClick={()=>this.onClickSliderArrow(1)}><img src={imgSliderArrowNext}></img></div>
						</div>
					}
					{type === 'video' &&
						<div className='video-content flex'>
							<Vimeo video={videoUrl} autoplay controls width={contentW} height={Math.min(contentH, contentW*0.5625)}></Vimeo>
						</div>
					}
					{type === 'exterior' &&
						<div className='content exterior-content flex'>
							<div className='left-side side-part'>
								{imgUrl && <img src={imgUrl} style={{maxWidth:contentW/2+'px'}}></img>}
								{videoUrl && <Vimeo video={videoUrl} autoplay controls width={contentW/2} height={Math.min(contentH, contentW/2 * 0.5625) }></Vimeo>}
							</div>
							<div className='right-side side-part'>
								{subTitle && <div className={`modal-title `}>{subTitle}</div>}
								{label.map((item, idx )=>
									<React.Fragment key={idx}>
									<label key={idx}>{item}</label>
									<br></br><br></br>
									</React.Fragment>
									
								)}
							</div>
						</div>
					}
					<div className={`close-icon flex-part ${multiKey?'hover-left':''}`} onClick={()=>{ this.onClickClose('multi'); }}>
						<img src={imgClose}></img>
					</div>
					{multiKey&&
						<div className='back-button flex' onClick={()=>this.onClickClose('sub')}>
							<img src={imgChevron}></img>
							<label> Back</label>
						</div>
					}
				</div>
			</div>
		);
	}
}
