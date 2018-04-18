import axios from 'axios'
import jsonp from 'common/js/jsonp'

export function checkTelnumYidaoApi(tel){
	const url = LOCAL_ROOT+LOCAL_DOMAIN+'/miscellaneous/Activityuserenroll/getCommon';
	return axios.post(url,{
		params: {tel:tel}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}

export function getCodeApi(telnum,imgcode){
	const url = LOCAL_ROOT+LOCAL_DOMAIN+'/activity/Webuser/getCode';
	return axios.post(url,{
		params: {cellphone:telnum,captcha:imgcode}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}