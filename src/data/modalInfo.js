import React from 'react';

import imgHotspot from '../assets/images/canvas/hotspot.png';

import thumbStage0 from '../assets/images/modal/stage-thumb-0.jpg';
import thumbStage1 from '../assets/images/modal/stage-thumb-1.jpg';
import thumbStage2 from '../assets/images/modal/stage-thumb-2.jpg';
import thumbStage3 from '../assets/images/modal/stage-thumb-3.jpg';
import thumbStage4 from '../assets/images/modal/stage-thumb-4.jpg';

export const stageThumbArr = [
	[
		{key:'stageVideo0', label:'Video', thumb:thumbStage0},
		{key:'stageVideo1', label:'Video', thumb:thumbStage1},
		{key:'stageVideo2', label:'Video', thumb:thumbStage2},
	],
	[
		{key:'stageVideo3', label:'Video', thumb:thumbStage3},
		{key:'stageVideo4', label:'Video', thumb:thumbStage4},
	],
]
export const stageVideoArr = [
	{key:'stageVideo0', videoUrl:'https://vimeo.com/661722795'},
	{key:'stageVideo1', videoUrl:'https://vimeo.com/661723081'},
]

const kioskIndustryAutomationVideoArr = [
	{key:'kioskIndustryAutomationVideo0', thumb:'./videos/kiosk/industry/automation0.png', videoUrl:'https://vimeo.com/661674208'},
	{key:'kioskIndustryAutomationVideo1', thumb:'./videos/kiosk/industry/automation1.png', videoUrl:'https://vimeo.com/661679820'},
	{key:'kioskIndustryAutomationVideo2', thumb:'./videos/kiosk/industry/automation2.png', videoUrl:'https://vimeo.com/661681202'},
]
const kioskIndustryFactoryVideoArr = [
	{key:'kioskIndustryFactoryVideo0', thumb:'./videos/kiosk/industry/factory0.png', videoUrl:'https://vimeo.com/661681329'},
]
const kioskIndustryFactoryPDFArr = [
	{key:'kioskIndustryFactoryPDF0', thumb:'./pdf/kiosk/industry/factory0.png', pdfUrl:'./pdf/kiosk/industry/factory0.pdf'},
]
const kioskIndustryRobotVideoArr = [
	{key:'kioskIndustryRobotVideo0', thumb:'./videos/kiosk/industry/robot0.png', videoUrl:'https://vimeo.com/661681536'},
	{key:'kioskIndustryRobotVideo1', thumb:'./videos/kiosk/industry/robot1.png', videoUrl:'https://vimeo.com/661681572'},
	{key:'kioskIndustryRobotVideo2', thumb:'./videos/kiosk/industry/robot2.png', videoUrl:'https://vimeo.com/661681608'},
]
const kioskIndustryRobotPDFArr = [
	{key:'kioskIndustryRobotPDF0', thumb:'./pdf/kiosk/industry/robot0.png', pdfUrl:'./pdf/kiosk/industry/robot0.pdf'},
]
const kioskIndustryRobotImageArr = [
	{key:'kioskIndustryRobotImage0', imgUrl:'./images/kiosk-images/industry/robot0.jpg', thumb:'./images/kiosk-images/industry/robot0.jpg'},
	{key:'kioskIndustryRobotImage1', imgUrl:'./images/kiosk-images/industry/robot1.png', thumb:'./images/kiosk-images/industry/robot1.png'},
	{key:'kioskIndustryRobotImage2', imgUrl:'./images/kiosk-images/industry/robot2.png', thumb:'./images/kiosk-images/industry/robot2.png'},
	{key:'kioskIndustryRobotImage3', imgUrl:'./images/kiosk-images/industry/robot3.png', thumb:'./images/kiosk-images/industry/robot3.png'},
	{key:'kioskIndustryRobotImage4', imgUrl:'./images/kiosk-images/industry/robot4.jpg', thumb:'./images/kiosk-images/industry/robot4.jpg'},
]
const kioskStructureAutomationVideoArr = [
	{key:'kioskStructureAutomationVideo0', thumb:'./videos/kiosk/structure/automation0.png', videoUrl:'https://vimeo.com/661686823'},
	{key:'kioskStructureAutomationVideo1', thumb:'./videos/kiosk/structure/automation1.png', videoUrl:'https://vimeo.com/661689120'},
]
const kioskStructurePowerVideoArr = [
	{key:'kioskStructurePowerVideo0', thumb:'./videos/kiosk/structure/power0.png', videoUrl:'https://vimeo.com/661689516'},
	{key:'kioskStructurePowerVideo1', thumb:'./videos/kiosk/structure/power1.png', videoUrl:'https://vimeo.com/661689983'},
]
const kioskStructurePowerPDFArr = [
	{key:'kioskStructurePowerPDF0', thumb:'./pdf/kiosk/structure/power0.png', pdfUrl:'./pdf/kiosk/structure/power0.pdf'},
	{key:'kioskStructurePowerPDF1', thumb:'./pdf/kiosk/structure/power1.png', pdfUrl:'./pdf/kiosk/structure/power1.pdf'},
	{key:'kioskStructurePowerPDF2', thumb:'./pdf/kiosk/structure/power2.png', pdfUrl:'./pdf/kiosk/structure/power2.pdf'},
]
const kioskStructurePowerImageArr = [
	{key:'kioskStructurePowerImage0', imgUrl:'./images/kiosk-images/structure/power0.jpg', thumb:'./images/kiosk-images/structure/power0.jpg'},
]
const kioskStructureUndergroundVideoArr = [
	{key:'kioskStructureUndergroundVideo0', thumb:'./videos/kiosk/structure/underground0.png', videoUrl:'https://vimeo.com/661690860'},
]
const kioskStructureSeamlessVideoArr = [
	{key:'kioskStructureSeamlessVideo0', thumb:'./videos/kiosk/structure/seamless0.png', videoUrl:'https://vimeo.com/661690504'},
]
const kioskLifeSensorVideoArr = [
	{key:'kioskLifeSensorVideo0', thumb:'./videos/kiosk/life/sensor0.png', videoUrl:'https://vimeo.com/661685278'},
]
const kioskLIfeSensorImageArr = [
	{key:'kioskLIfeSensorImage0', imgUrl:'./images/kiosk-images/life/sensor0.jpg', thumb:'./images/kiosk-images/life/sensor0.jpg'},
]
const kioskLifeDeluxeVideoArr = [
	{key:'kioskLifeDeluxeVideo0', thumb:'./videos/kiosk/life/deluxe0.png', videoUrl:'https://vimeo.com/661683900'},
]
const kioskLIfeDeluxeImageArr = [
	{key:'kioskLIfeDeluxeImage0', imgUrl:'./images/kiosk-images/life/deluxe0.jpg', thumb:'./images/kiosk-images/life/deluxe0.jpg'},
	{key:'kioskLIfeDeluxeImage1', imgUrl:'./images/kiosk-images/life/deluxe1.jpg', thumb:'./images/kiosk-images/life/deluxe1.jpg'},
	{key:'kioskLIfeDeluxeImage2', imgUrl:'./images/kiosk-images/life/deluxe2.jpg', thumb:'./images/kiosk-images/life/deluxe2.jpg'},
]
const kioskLifeHyperVideoArr = [
	{key:'kioskLifeHyperVideo0', thumb:'./videos/kiosk/life/hyper0.png', videoUrl:'https://vimeo.com/661684527'},
]
const kioskLIfeHyperImageArr = [
	{key:'kioskLIfeHyperImage0', imgUrl:'./images/kiosk-images/life/hyper0.jpg', thumb:'./images/kiosk-images/life/hyper0.jpg'},
]
const kioskLifeHealthVideoArr = [
	{key:'kioskLifeHealthVideo0', thumb:'./videos/kiosk/life/health0.png', videoUrl:'https://vimeo.com/661684142'},
]
const kioskLIfeHealthImageArr = [
	{key:'kioskLIfeHealthImage0', imgUrl:'./images/kiosk-images/life/health0.jpg', thumb:'./images/kiosk-images/life/health0.jpg'},
]
const kioskLifeAerialVideoArr = [
	{key:'kioskLifeAerialVideo0', thumb:'./videos/kiosk/life/aerial0.png', videoUrl:'https://vimeo.com/661683616'},
]
const kioskLIfeAerialImageArr = [
	{key:'kioskLIfeAerialImage0', imgUrl:'./images/kiosk-images/life/aerial0.jpg', thumb:'./images/kiosk-images/life/aerial0.jpg'},
	{key:'kioskLIfeAerialImage1', imgUrl:'./images/kiosk-images/life/aerial1.jpg', thumb:'./images/kiosk-images/life/aerial1.jpg'},
	{key:'kioskLIfeAerialImage2', imgUrl:'./images/kiosk-images/life/aerial2.jpg', thumb:'./images/kiosk-images/life/aerial2.jpg'},
	{key:'kioskLIfeAerialImage3', imgUrl:'./images/kiosk-images/life/aerial3.jpg', thumb:'./images/kiosk-images/life/aerial3.jpg'},
	{key:'kioskLIfeAerialImage4', imgUrl:'./images/kiosk-images/life/aerial4.jpg', thumb:'./images/kiosk-images/life/aerial4.jpg'},
]
const kioskLifePureideVideoArr = [
	{key:'kioskLifePureideVideo0', thumb:'./videos/kiosk/life/pureide0.png', videoUrl:'https://vimeo.com/661685189'},
]
const kioskLifePureidePDFArr = [
	{key:'kioskLifePureidePDF0', thumb:'./pdf/kiosk/life/pureide0.png', pdfUrl:'./pdf/kiosk/life/pureide0.pdf'},
]
const kioskLIfePureideImageArr = [
	{key:'kioskLIfePureideImage0', imgUrl:'./images/kiosk-images/life/pureide0.jpg', thumb:'./images/kiosk-images/life/pureide0.jpg'},
	{key:'kioskLIfePureideImage1', imgUrl:'./images/kiosk-images/life/pureide1.jpg', thumb:'./images/kiosk-images/life/pureide1.jpg'},
	{key:'kioskLIfePureideImage2', imgUrl:'./images/kiosk-images/life/pureide2.jpg', thumb:'./images/kiosk-images/life/pureide2.jpg'},
	{key:'kioskLIfePureideImage3', imgUrl:'./images/kiosk-images/life/pureide3.jpg', thumb:'./images/kiosk-images/life/pureide3.jpg'},
	{key:'kioskLIfePureideImage4', imgUrl:'./images/kiosk-images/life/pureide4.jpg', thumb:'./images/kiosk-images/life/pureide4.jpg'},
]
const kioskLifeSustieVideoArr = [
	{key:'kioskLifeSustieVideo0', thumb:'./videos/kiosk/life/sustie0.png', videoUrl:'https://vimeo.com/661685551'},
]
const kioskMobilityAutoVideoArr = [
	{key:'kioskMobilityAutoVideo0', thumb:'./videos/kiosk/mobility/auto0.png', videoUrl:'https://vimeo.com/661700355'},
]
const kioskMobilityAutoPDFArr = [
	{key:'kioskMobilityAutoPDF0', thumb:'./pdf/kiosk/mobility/auto0.png', pdfUrl:'./pdf/kiosk/mobility/auto0.pdf'},
	{key:'kioskMobilityAutoPDF1', thumb:'./pdf/kiosk/mobility/auto1.png', pdfUrl:'./pdf/kiosk/mobility/auto1.pdf'},
]
const kioskMobilityAutoImageArr = [
	{key:'kioskMobilityAutoImage0', imgUrl:'./images/kiosk-images/mobility/auto0.jpg', thumb:'./images/kiosk-images/mobility/auto0.jpg'},
]
const kioskMobilityAssitancePDFArr = [
	{key:'kioskMobilityAssitancePDF0', thumb:'./pdf/kiosk/mobility/assitance0.png', pdfUrl:'./pdf/kiosk/mobility/assitance0.pdf'},
]
const kioskMobilityAssitanceImageArr = [
	{key:'kioskMobilityAssitanceImage0', imgUrl:'./images/kiosk-images/mobility/assitance0.png', thumb:'./images/kiosk-images/mobility/assitance0.png'},
	{key:'kioskMobilityAssitanceImage1', imgUrl:'./images/kiosk-images/mobility/assitance1.png', thumb:'./images/kiosk-images/mobility/assitance1.png'},
]
const kioskMobilityElectricVideoArr = [
	{key:'kioskMobilityElectricVideo0', thumb:'./videos/kiosk/mobility/electric0.png', videoUrl:'https://vimeo.com/661700613'},
]
const kioskMobilityElectricPDFArr = [
	{key:'kioskMobilityElectricPDF0', thumb:'./pdf/kiosk/mobility/electric0.png', pdfUrl:'./pdf/kiosk/mobility/electric0.pdf'},
	{key:'kioskMobilityElectricPDF1', thumb:'./pdf/kiosk/mobility/electric1.png', pdfUrl:'./pdf/kiosk/mobility/electric1.pdf'},
]
const kioskMobilityElectricImageArr = [
	{key:'kioskMobilityElectricImage0', imgUrl:'./images/kiosk-images/mobility/electric0.jpg', thumb:'./images/kiosk-images/mobility/electric0.jpg'},
	{key:'kioskMobilityElectricImage1', imgUrl:'./images/kiosk-images/mobility/electric1.jpg', thumb:'./images/kiosk-images/mobility/electric1.jpg'},
]
const kioskMobilityRobotVideoArr = [
	{key:'kioskMobilityRobotVideo0', thumb:'./videos/kiosk/mobility/robot0.png', videoUrl:'https://vimeo.com/661700823'},
	{key:'kioskMobilityRobotVideo1', thumb:'./videos/kiosk/mobility/robot1.png', videoUrl:'https://vimeo.com/661701080'},
	{key:'kioskMobilityRobotVideo2', thumb:'./videos/kiosk/mobility/robot2.png', videoUrl:'https://vimeo.com/661701733'},
	{key:'kioskMobilityRobotVideo3', thumb:'./videos/kiosk/mobility/robot3.png', videoUrl:'https://vimeo.com/661702005'},
	{key:'kioskMobilityRobotVideo4', thumb:'./videos/kiosk/mobility/robot4.png', videoUrl:'https://vimeo.com/661702148'},
	{key:'kioskMobilityRobotVideo5', thumb:'./videos/kiosk/mobility/robot5.png', videoUrl:'https://vimeo.com/661702593'},
	{key:'kioskMobilityRobotVideo6', thumb:'./videos/kiosk/mobility/robot6.png', videoUrl:'https://vimeo.com/661702824'},
	{key:'kioskMobilityRobotVideo7', thumb:'./videos/kiosk/mobility/robot7.png', videoUrl:'https://vimeo.com/661702968'},
	{key:'kioskMobilityRobotVideo8', thumb:'./videos/kiosk/mobility/robot8.png', videoUrl:'https://vimeo.com/661703378'},
]
const kioskMobilityRobotImageArr = [
	{key:'kioskMobilityRobotImage0', imgUrl:'./images/kiosk-images/mobility/robot0.png', thumb:'./images/kiosk-images/mobility/robot0.png'},
	{key:'kioskMobilityRobotImage1', imgUrl:'./images/kiosk-images/mobility/robot1.png', thumb:'./images/kiosk-images/mobility/robot1.png'},
]

export const tvPlaneArr = [
	{key:'structure', title:'Infrastructure Kiosk', buttons:[
		{id:'power', label:'Power-I', classStr:'mt-100', video:kioskStructurePowerVideoArr, pdf:kioskStructurePowerPDFArr, image:kioskStructurePowerImageArr},
		{id:'smarter', label:'Smarter Grid Solutions', classStr:''},
		{id:'seamless', label:'Seamless Security', classStr:'', video:kioskStructureSeamlessVideoArr},
		{id:'underground', label:'Underground Imaging', classStr:'', video:kioskStructureUndergroundVideoArr},
		{id:'automation', label:'Automation Software Solutions', classStr:'mt-100', video:kioskStructureAutomationVideoArr},
	]},
	{key:'industry', title:'Industry Kiosk', buttons:[
		{id:'robotire', label:'RoboTire', classStr:'mt-70', video:kioskIndustryRobotVideoArr, pdf:kioskIndustryRobotPDFArr, image:kioskIndustryRobotImageArr},
		{id:'factory', label:'eF@ctory', classStr:'', video:kioskIndustryFactoryVideoArr, pdf:kioskIndustryFactoryPDFArr},
		{id:'automation', label:'Automation Software Solutions', classStr:'mt-70', video:kioskIndustryAutomationVideoArr},
	]},
	{key:'life', title:'Life Kiosk', buttons:[
		{id:'pureide', label:'PureRide™ Touchless Control', classStr:'mt-100', video:kioskLifePureideVideoArr, pdf:kioskLifePureidePDFArr, image:kioskLIfePureideImageArr},
		{id:'aerial', label:'Hygienic Touch Operable Aerial Display', classStr:'mt-70', video:kioskLifeAerialVideoArr, image:kioskLIfeAerialImageArr},
		{id:'hyper', label:'Hyper-Heating Inverter®', classStr:'mt-70', video:kioskLifeHyperVideoArr, image:kioskLIfeHyperImageArr},
		{id:'sensor', label:'3D i-See Sensor®', classStr:'', video:kioskLifeSensorVideoArr, image:kioskLIfeSensorImageArr},
		{id:'health', label:'HealthCam', classStr:'mt-70', video:kioskLifeHealthVideoArr, image:kioskLIfeHealthImageArr},
		{id:'deluxe', label:'Deluxe Wall-Mounted Indoor Unit', classStr:'mt-100', video:kioskLifeDeluxeVideoArr, image:kioskLIfeDeluxeImageArr},
		{id:'sustie', label:'Smart Buildings and Smart Places', classStr:'mt-100', video:kioskLifeSustieVideoArr},
	]},
	{key:'mobility', title:'Mobility Kiosk', buttons:[
		{id:'autonomous', label:'Autonomous Driving', classStr:'mt-100', video:kioskMobilityAutoVideoArr, pdf:kioskMobilityAutoPDFArr, image:kioskMobilityAutoImageArr},
		{id:'assistance', label:'Driver Assistance / Crew Watch', classStr:'', image:kioskMobilityAssitanceImageArr, pdf:kioskMobilityAssitancePDFArr},
		{id:'electric', label:'Electrification', classStr:'', video:kioskMobilityElectricVideoArr, image:kioskMobilityElectricImageArr, pdf:kioskMobilityElectricPDFArr},
		{id:'robot', label:'Indoor and Outdoor Distribution', classStr:'mt-100', video:kioskMobilityRobotVideoArr, image:kioskMobilityRobotImageArr},
	]},
]

const middle1multiArr = [
	{key:'middle1video0', img:'./videos/middle1.jpg', label:' Overview'},
	{key:'middle1image0', img:'./images/middle_1_0.jpg', label:'Product Description'},
	{key:'middle1image1', img:'./images/middle_1_1.jpg', label:'Product Description'},
]
const middle4multiArr = [
	{key:'middle4video0', img:'./videos/middle4.jpg', label:'Overview'},
	{key:'middle4pdf0', img:'./pdf/middle4_0.jpg', label:'Product Description'},
	{key:'middle4pdf1', img:'./pdf/middle4_1.jpg', label:'Product Description'},
]

const middle2multiArr = [
	{key:'middle2video0', img:'./videos/middle2/video0.jpg', label:'Building 1'},
	{key:'middle2video1', img:'./videos/middle2/video1.jpg', label:'Building 2'},
	{key:'middle2video3', img:'./videos/middle2/video3.jpg', label:'Building 3'},
	{key:'middle2video4', img:'./videos/middle2/video4.jpg', label:'Hospital 1'},
	{key:'middle2video5', img:'./videos/middle2/video5.jpg', label:'Hospital 2'},
	{key:'middle2video6', img:'./videos/middle2/video6.jpg', label:'Hospital 3'},
	{key:'middle2video7', img:'./videos/middle2/video7.jpg', label:'Shopping Mall 1'},
	{key:'middle2video8', img:'./videos/middle2/video8.jpg', label:'Shopping Mall 2'},
	{key:'middle2video9', img:'./videos/middle2/video9.jpg', label:'Shopping Mall 3'},
]

const stageTVmultiArr = [
	{key:'stageTVMain', img:'./videos/stage/stage_main.jpg', label:'Exhibit Theme'},
	{key:'stageTVLife', img:'./videos/stage/stage_life.jpg', label:'Day in the Life with Mitsubishi Electric'},
	{key:'stageTVPower', img:'./videos/stage/stage_power.jpg', label:'The Future of Semiconductors'},
	{key:'stageTVElectric', img:'./videos/stage/stage_electric.jpg', label:'Mitsubishi Electric Corporate Vision'},
	{key:'stageTVMobility', img:'./videos/stage/stage_mobility.jpg', label:'The Future of Mobility'},
	{key:'stageTVFuture', img:'./videos/stage/stage_future.jpg', label:'CES 2022 Future of Work'},
	// {key:'stageTVMelic', img:'./videos/stage/stage_melic.jpg', label:'CES 2022 MELIC Presentation'},
]

const testVideoUrl = 'https://vimeo.com/661673149';
const welcomeLabel = ['Welcome to the Mitsubishi Electric virtual booth that introduces our vision of contributing to a vibrant and sustainable future by addressing social issues through various advanced technologies and solutions that help connect and unite a Smart Society.', 'Visit the four key areas of the exhibit—Life, Industry, Infrastructure and Mobility—to go on a deeper dive of information and learn more about how a diversified electronics company can address social issues both within these individual segments but also through integrated solutions.'];
const exterTitle = 'A Smart Society that Connects and Unites';
const exterLabel = ['By addressing social issues through various advanced technologies and solutions that help connect and unite, Mitsubishi Electric hopes to contribute to a truly vibrant and sustainably Smart Society for all people.'];
const lifeLabel = ['Mitsubishi Electric US, Inc. is proud to announce that its Elevators and Escalators Division’s new PureRide™ Touchless Control for elevators has been recognized as a 2022 CES® Innovation Awards honoree. Sponsored by the Consumer Technology Association (CTA), the CES Innovation Awards is the largest and most influential technology event in the world.', 'Since 1967, the awards have honored breakthrough technologies and global innovators for cutting-edge consumer technology products that transform people’s lives and society for the better. ']

export const multiModalArr = [
	{key:'middle1multi0', title: 'Electrification', subArr:middle1multiArr},
	{key:'middle2multi0', title: 'Indoor & Outdoor Distribution Applications', subArr:middle2multiArr},
	{key:'middle4multi0', title: 'Autonomous Driving', subArr:middle4multiArr},
	{key:'stageTVmulti', title: 'Main Stage', subArr:stageTVmultiArr},
]

export const subItemArr = [
	{key:'introvideo', type:'exterior', title:'Welcome', videoUrl:'https://vimeo.com/661712648', label:welcomeLabel},
	{key:'welcomevideo', type:'video', title:'Welcome Video', videoUrl:'https://vimeo.com/661712648'},
	{key:'exteriorwelcome', type:'exterior', title:'Welcome Video', videoUrl:'https://vimeo.com/661712648', label:welcomeLabel},
	{key:'mobility0video0', type:'video', title:'The Future of Mobility', videoUrl:'https://vimeo.com/661724906'},
	{key:'sustainpower0', type:'power', title:'Sustainablity', imgArr:getPowerArr('./slider/sustain/', 3, '.jpg')},
	{key:'sustainvideo0', type:'video', title:'Sustainablity', videoUrl:testVideoUrl},
	{key:'middle1video0', type:'video', title:'Overview', videoUrl:'https://vimeo.com/661718585'},
	{key:'middle1image0', type:'image', title:'Product Description', imgUrl:'./images/middle_1_0.jpg'},
	{key:'middle1image1', type:'image', title:'Product Description', imgUrl:'./images/middle_1_1.jpg'},

	{key:'middle2video0', type:'video', title:'Building 1', videoUrl:'https://vimeo.com/661871990'},
	{key:'middle2video1', type:'video', title:'Building 2', videoUrl:'https://vimeo.com/661872011'},
	{key:'middle2video3', type:'video', title:'Building 3', videoUrl:'https://vimeo.com/661872035'},
	{key:'middle2video4', type:'video', title:'Hospital 1', videoUrl:'https://vimeo.com/661872057'},
	{key:'middle2video5', type:'video', title:'Hospital 2', videoUrl:'https://vimeo.com/661872074'},
	{key:'middle2video6', type:'video', title:'Hospital 3', videoUrl:'https://vimeo.com/661872094'},
	{key:'middle2video7', type:'video', title:'Shopping Mall 1', videoUrl:'https://vimeo.com/661872107'},
	{key:'middle2video8', type:'video', title:'Shopping Mall 2', videoUrl:'https://vimeo.com/661872124'},
	{key:'middle2video9', type:'video', title:'Shopping Mall 3', videoUrl:'https://vimeo.com/661872148'},
	// {key:'middle2image0', type:'image', title:'Mobility Video', imgUrl:'./images/middle_2_0.jpg'},

	{key:'middle3video0', type:'video', title:'Driver Assistance', videoUrl:'https://vimeo.com/661704192'},
	{key:'middle4video0', type:'video', title:'Overview', videoUrl:'https://vimeo.com/661705027'},
	{key:'middle4pdf0', type:'pdf', title:'Product Description', pdfUrl:'./pdf/middle4_0.pdf'},
	{key:'middle4pdf1', type:'pdf', title:'Product Description', pdfUrl:'./pdf/middle4_1.pdf'}, // imgArr:getPowerArr('./slider/test/test_slider_', 9, '.jpg')
	{key:'structuredemo0', type:'video', title:'Infrastructure Demo', videoUrl:'https://vimeo.com/661723991'},
	{key:'industrydemo0', type:'video', title:'Industry Demo', videoUrl:'https://vimeo.com/661719744'},
	{key:'lifedemo0', type:'video', title:'HealthCare Demo', videoUrl:'https://vimeo.com/661721764'},
	{key:'lifedemo1', type:'label', title:'Life Demo 2', label:'Coming Soon'},
	{key:'lifedemo2', type:'label', title:'Life Demo 3', label:'Coming Soon'},

	{key:'exteriormodal', type:'exterior', title:'Exterior', imgUrl:'./images/exterior.jpg', label:exterLabel, subTitle:exterTitle},
	{key:'exter_1modal', type:'exterior', title:'Exterior', imgUrl:'./images/exter_1.jpg', label:exterLabel, subTitle:exterTitle},
	{key:'exter_2modal', type:'exterior', title:'Exterior', imgUrl:'./images/exter_2.jpg', label:exterLabel, subTitle:exterTitle},

	{key:'next100video0', type:'video', title:'Life Overview (video has no sound)', videoUrl:'https://vimeo.com/662035476'},
	{key:'exteriorCorridor0', type:'power', title:'SDGs', imgArr:getPowerArr('./slider/corridor/middle0_', 3, '.jpg')},
	{key:'exteriorCorridor1', type:'power', title:'SDGs', imgArr:getPowerArr('./slider/corridor/middle1_', 3, '.jpg')},
	{key:'exteriorCorridor2', type:'power', title:'SDGs', imgArr:getPowerArr('./slider/corridor/middle2_', 3, '.jpg')},
	{key:'tvBackStructure', type:'video', title:'Infrastructure Overview (video has no sound)', videoUrl:'https://vimeo.com/661723396'},
	{key:'tvBackIndustry', type:'video', title:'Industry Overview (video has no sound)', videoUrl:'https://vimeo.com/661719266'},
	{key:'tvBackLife', type:'video', title:'Life Overview (video has no sound)', videoUrl:'https://vimeo.com/663056588'},
	{key:'lifeElevetorext0', type:'exterior', title:'CES Award', imgUrl:'./images/life-elevetor.jpg', label:lifeLabel, subTitle:'CES 2022 Innovation Award'},

	{key:'stageTVMain', type:'video', title:'Exhibit Theme', videoUrl:'https://vimeo.com/662041088'},
	{key:'stageTVLife', type:'video', title:'Day in the Life with Mitsubishi Electric', videoUrl:'https://vimeo.com/662038594'},
	{key:'stageTVPower', type:'video', title:'The Future of Semiconductors', videoUrl:'https://vimeo.com/662037570'},
	{key:'stageTVElectric', type:'video', title:'Mitsubishi Electric Corporate Vision', videoUrl:'https://vimeo.com/662159521'},
	{key:'stageTVMobility', type:'video', title:'The Future of Mobility', videoUrl:'https://vimeo.com/661724906'},
	{key:'stageTVFuture', type:'video', title:'CES 2022 Future of Work', videoUrl:'https://vimeo.com/662562966'},
	{key:'stageTVMelic', type:'video', title:'CES 2022 MELIC Presentation', videoUrl:'https://vimeo.com/662567038'},
]

function getPowerArr(url, num, format) {
	var arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(url+i+format);
	}
	return arr;
}

export function GetTVModalSize (wWidth, wHeight, browType) {
	const hRate = (browType==='mobile')?1:0.9, tWidth = wWidth, tHeight = hRate===1 ? wHeight - 110: wHeight;
	const vWidth = Math.min(1400, tWidth * 0.9), cHeight = Math.min( vWidth * 9/16, tHeight * hRate);
	const cWidth = cHeight*16/9, bRate = cWidth/1400, bTop = (cHeight-787.5)/2*bRate;
	const mLeft = browType!=='mobile'?0:(tWidth-30-cWidth)/2; //tWidth>1280
	return {cWidth, cHeight, cRate:cHeight/1080, bRate, bTop, mLeft};
}

export function DisplayInput() {
	const inputArr = document.getElementsByTagName('input');
	for (let i = 0; i < inputArr.length; i++) {
		const inputItem = inputArr[i];
		inputItem.setAttribute('style', 'display:none');
	}
	document.body.focus();
	setTimeout(() => {
		for (let i = 0; i < inputArr.length; i++) {
			const inputItem = inputArr[i];
			inputItem.setAttribute('style', 'display:initial');
		}
	}, 0);
}

export class TVPlane extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tvKey:props.tvKey, buttons:props.buttons, classStr:props.classStr, id:props.id};
	}

	componentDidMount() {
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
	}

	onClickButton = (item) => {
		this.props.onClickButton(item);
	}

	render() {
		const {tvKey, buttons, classStr, id} = this.state;
		return (
			<div className={`${classStr} tvPlane_${tvKey}_main`} id={id}>
				<div className='button-area'>
					{buttons.map((buttonItem, buttonIdx )=>
						<div className={`tv-button ${buttonItem.classStr}`} id={buttonItem.id} key={buttonIdx}>
							<div className='circle-inner'><label>{buttonItem.label}</label></div>
							<div className='circle-outer'></div>
						</div>
					)}
					{/* onClick={()=>this.onClickButton(item)} */}
				</div>
				{this.props.showButton && <div className={`tv-hot-button tvHotButton${tvKey}`} id={`tvHotButton${tvKey}`} onClick={this.props.onClickButton}><img src={imgHotspot}></img></div>}
			</div>
		);
	}
}
