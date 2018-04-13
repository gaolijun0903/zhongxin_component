import axios from 'axios'

export function getDriverInfo(){
	const url = ''
	return axios.get(url,{
		params: data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}

export function getCityName(lat,lng){
	const url = 'https://www.yongche.com/greencar/ajax/get_city.php'
	return axios.post(url,{
		headers:{
			referer: 'https://www.yongche.com/',
			host: 'www.yongche.com'
		},
		params: {lat:lat,lng:lng}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}

export function checkBanknet(lat,lng){
	const url = ''
	return axios.post(url,{
		headers:{
			referer: 'https://www.yongche.com/',
			host: 'www.yongche.com'
		},
		params: {lat:lat,lng:lng}
	}).then((res)=>{
		return Promise.resolve(res.data)
	}).catch((e)=>{
		console.log(e)
	})
}