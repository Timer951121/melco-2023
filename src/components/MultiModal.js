import React from 'react';

import {multiModalArr} from '../data/modalInfo';
import imgClose from '../assets/images/close.png';

export default class MultiModalComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {multiKey:props.multiKey, multiInner:props.multiInner, subKey:props.subKey, rowArr:[]};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.multiKey !== nextProps.multiKey) {
			const selItem = multiModalArr.find(item=>item.key===nextProps.multiKey);
			const rowArr = [], rowCount = 3;

			if (selItem && selItem.subArr && selItem.subArr.length) {
				selItem.subArr.forEach((item, idx) => {
					const num = Math.floor(idx/rowCount), pos = idx % rowCount;
					item.oriIdx = idx;
					if (pos === 0) rowArr[num] = [item];
					else rowArr[num].push(item);
				});
			}
			this.setState({multiKey:nextProps.multiKey, rowArr, title:selItem ?selItem.title:''});
		}
		if (this.state.multiInner !== nextProps.multiInner) {
			this.setState({multiInner:nextProps.multiInner});
		}
		if (this.state.subKey !== nextProps.subKey) {
			this.setState({subKey:nextProps.subKey});
		}
	}

	onClickSubItem = (item) => {
		this.props.setScene(item.key);
	}

	onClickClose = () => {
		this.props.closeMultiModal('multiInner');
		setTimeout(() => {
			this.props.closeMultiModal('multiKey');
		}, 500);
	}

	render() {
		const {multiKey, multiInner, rowArr, title, subKey} = this.state;
		return (
			<div className={`multi-modal modal-back ${multiKey?'active':''} ${subKey?'sub-opened':''}`}>
				<div className={`modal-wrapper ${multiInner?'active':''}`}>
					{multiKey &&
						<>
							<div className='modal-title'>{title}</div>
							<div className='content multi-modal-content flex scroll'>
								<div className='scroll-wrapper'>
									{rowArr.map((rowItem, rowIdx) =>
										<div className='multi-row flex' key={rowIdx}>
											{rowItem.map((item, idx) =>
												<div className='sub-item flex' key={idx} onClick={()=>this.props.openObjectModal('sub', item.key)}>
													<div className='sub-image flex'><img src={item.img}></img></div>
													<div className='sub-label'>{item.label}</div>
												</div>
											) }
										</div>
									) }
								</div>
							</div>
						</>
					}
					<div className='close-icon flex' onClick={this.onClickClose}><img src={imgClose}></img></div>
				</div>
			</div>
		);
	}
}
