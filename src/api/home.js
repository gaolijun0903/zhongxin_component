import axios from 'axios'
import jsonp from 'common/js/jsonp'

export function getDriverInfo(){
	const url = LOCAL_ROOT+LOCAL_DOMAIN+'/miscellaneous/Activityuserenroll/getCommon';
	return axios.get(url,{
		params: {type:'app',city:''}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
	//return jsonp(url,{type:'app',city:''})
}

export function getCityName(lat,lng){
	const url = LOCAL_ROOT+'https://www.yongche.com/greencar/ajax/get_city.php';
	return axios.post(url,{
		params: {lat:lat,lng:lng}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}

export function checkBanknetApi(lat,lng){
	const url = LOCAL_ROOT+LOCAL_DOMAIN+'/miscellaneous/Activityuserenroll/getCommon';
	return axios.post(url,{
		params: {lat:lat,lng:lng}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}
