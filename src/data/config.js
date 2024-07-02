
const host_url = window.location.origin;
const mainUrl = {
	localhost: 'http://localhost/fiberon-backend/public',
	dev: 'https://mitsubishi.thetunagroup.com', // 'api-documentation', /mitsubishiadm
	production:'https://veadmin.fiberondecking.com',
	meet_url_dev:'https://fiberonmeet.thetunagroup.com/tuna.meet.api.js',
	meet_url_production:'https://vemeet.fiberondecking.com/tuna.meet.api.js',
	host_url: host_url,
	voice_url: 'https://fiberonvoice.thetunagroup.com'
}

export const baseUrl = mainUrl.dev;
export const prodUrl = mainUrl.production;
export const voiceUrl = mainUrl.voice_url;

export function GetDeviceInfo() {
	const navigator_info = window.navigator;
	const screen_info = window.screen;
	var id = navigator_info.mimeTypes.length;
	id += navigator_info.userAgent.replace(/\D+/g, '');
	id += navigator_info.plugins.length;
	id += screen_info.height || '';
	id += screen_info.width || '';
	id += screen_info.pixelDepth || '';

	// var userAgent = navigator.userAgent.toLowerCase();
	// const typeAndroid = userAgent.indexOf("android") > -1;
	// const typeIOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent); 
	// const typeWeb =( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? 'mobile':'web';
	// var type = 1;
	// if 		(typeWeb==='web') type = 1;
	// else if (typeIOS) type = 1;
	// else if (typeAndroid) type = 1;
	return {id, type:'1'};
}
