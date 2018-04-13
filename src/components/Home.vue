<template>
  <div class="home">
    <div class="applywrapper">
				<div class="info-wrapper panel">
					<ul class="infolist">
						<li class="panelitem border name">
							<div class="item-left">姓名</div>
							<div class="item-right">{{info.name}}</div>
						</li>
						<li class="panelitem border identity">
							<div class="item-left">身份证号</div>
							<div class="item-right">{{info.identity}}</div>
						</li>
						<li class="panelitem border area">
							<div class="item-left">所在区域</div>
							<div class="item-right">
								<input id="infoArea" type="text" readonly="" v-model = "area"/>
							</div>
						</li>
						<li class="panelitem address">
							<div class="item-left">详细地址</div>
							<div class="item-right">
								<textarea id="erea" rows="1" cols="28" maxlength="28"  v-model="addressInput"  placeholder="请详细到门牌号"></textarea>
							</div>
						</li>
					</ul>
				</div>
				<div class="notice">中信银行将为您邮寄卡片，请保证填写地址真实有效</div>
				<div class="tel-code-wrapper panel">
					<telcodegroup ref="telcode"></telcodegroup>
				</div>
				<div class="notice">该手机号将作为您的中信银行预留手机号</div>
				<div>
					<agreecheckbox @check="checkAgree"></agreecheckbox>
				</div>
				<div class="btnwrapper">
					<div class="btn" :class="ableSubmit" @click="submitInfo">提交</div>
				</div>
				<toast ref="toast"></toast>
				<confirm-mask ref="confirmmask"></confirm-mask>
		</div>
  </div>
</template>

<script>
import Telcodegroup from '@/components/Telcodegroup'
import Agreecheckbox from '@/components/Checkbox'
import Toast from '@/components/Toast'
import ConfirmMask from '@/components/ConfirmMask.vue'
import {getDriverInfo,getCityName} from 'api/home'	
	
export default {
  name: 'Home',
  data () {
    return {
      info:{  //后台接口返回后赋值
		  		name:'',
		  		identity:'',
		  		telnumBring:''
		  	},
		  	area:null,		//所在区域，根据定位获取后赋值
		  	addressInput:null,  //输入的详细地址，最多20字
		  	
		  	isAgree:false,  //是否同意各种协议 , 默认是未选中
		  	noneBankNet:false //当前定位城市没有银行网点弹窗提示，false-不提示，true-提示
    }
  },
  computed:{
		ableSubmit:function(){  //提交按钮的状态  able--->红色可点击，disable-->灰色不可点击
			/*if(this.needImgcode){
				return (this.$refs.telcode.checkTelnum() && this.isAgree && this.msgcodeInput && this.imgcodeInput) ? 'able' : 'disable';
			}
			if(this.needMsgcode){
				return (this.$refs.telcode.checkTelnum() && this.isAgree && this.msgcodeInput ) ? 'able' : 'disable';
			}
			return (this.$refs.telcode.checkTelnum()  && this.isAgree) ? 'able' : 'disable';*/
		}
	},
	mounted: function(){
//		console.log(1)
//		console.log(this.$refs.telcode)

//		console.log(this.$refs.toast)
//		this.$refs.toast.show('init')

//		console.log(this.$refs.confirmmask)
//		this.$refs.confirmmask.show()
		
		this.getCurrentPosition();
	  this.initData();
	},
	methods:{
	  	initData:function (){
	  		console.log('init')
	  		var vm = this;
	  		setTimeout(function(){
	  			vm.info = {
			  		name:'happy',
			  		identity:'130521***3445',
		  			telnumBring:'16801010040'
			  	}
		  		//vm.telnumInput = vm.info.telnumBring;  //TODO
		  		//vm.resultCode = 202;
		  		
		  		vm.initArea();
		  		
	  		},200)
		  		
	  		/*$.ajax({
	  			type:"(get)",
	  			url:"",
	  			//dataType:'jsonp',
	  			//xhrFields: {
                //    withCredentials: true
                //},
                //crossDomain: true,
                success:function(data) {
                	alert(data)
                },
                error:function(err){
                    vm.showToastFn(err.msg)
                }
	  		});*/
	  		
		},
		initArea:function(){  //初始化区域三级联动插件
			var area = new LArea();
			area.init({
        'trigger': '#infoArea',
        'trigger1': '#changeCity',  //更换城市用的
        'keys': {
            id: 'value',
            name: 'text'
        },
        'type': 2,
        'data': [provs_data, citys_data, dists_data]
    	});
		},
		getCurrentPosition:function(){  //H5获取定位
			var vm = this;
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function (position) {
			      	var lat = position.coords.latitude;
			      	var lng = position.coords.longitude;
			      	vm.positionToCity(lat,lng);//经纬度转为城市简码
			  	},function(err){
			  		vm.area  ='北京市,北京1'
			        //vm.getCityInfo('bj'); //如果H5未获取到定位，默认为"bj",由后台返回注册城市信息
			    });
			}
		},
		positionToCity:function(lat,lng){//把经纬度转为城市简码
			var vm = this;
			console.log(lat,lng)
			getCityName(lat,lng).then((data)=>{
				console.log(data);
				/*if(data.code==200){
            vm.cityShort = data.result.short;
            vm.area  = data.reult.province + data.result.city;
            console.log(vm.area)
        }else{
        	//vm.showToastFn(data.code) //TODO
        }*/
			})
			
		},
		checkAgree:function(isCheckAgree){
			this.isAgree = isCheckAgree;
		},
		checkBankNet:function(net,callback){  //判断所选区域是否有银行网点
			var vm = this;
			setTimeout(function(){
				if(net=='河北省,石家庄市,藁城市' || net==='河北省,邢台市,邢台县'){
					if(callback ) callback();
				}else{
					vm.$refs.confirmmask.show()
				}
			},500)
			
			/*$.ajax({
	  			type:"(get)",
	  			url:"",
	  			//dataType:'jsonp',
	  			//xhrFields: {
                //    withCredentials: true
                //},
                //crossDomain: true,
                success:function(data) {
                	alert(data)
                },
                error:function(err){
                    vm.showToastFn(err.msg)
                }
	  		});*/
		},
		submitInfo:function(){
			var vm = this;
			var allData = {
				name:this.info.name,
				identity:this.info.identity,
				area:this.area,
				address:this.addressInput,
				tel:this.telnumInput
			}
			console.log(allData)
			vm.checkBankNet(this.area, function(){
				console.log('提交给后台')
				setTimeout(function(){
					//vm.resultCode = 202;
					this.$router.push('/result')
				},200)
				
			});
			/*$.ajax({
	  			type:"(get)",
	  			url:"",
	  			//dataType:'jsonp',
	  			//xhrFields: {
                //    withCredentials: true
                //},
                //crossDomain: true,
                success:function(data) {
                	alert(data)
                },
                error:function(err){
                    vm.showToastFn(err.msg)
                }
	  		});*/
		},
		reApply:function(){
			console.log('重新申请')
			this.resultCode = null;
			this.initData();
		}
		
  	},
  	watch:{
  		area:function(newVal,oldVel){  //监测区域变化， 判断所选区域是否有银行网点
  			//console.log(newVal+" ---- "+oldVel)
  			//初始化赋值那次变化，不用判断是否有网点，为提升用户体验
  			if(oldVel){
  				this.checkBankNet(newVal)
  			}
  		},
  		telnumInput:function(newVal,oldVel){  //监测手机号输入变化，判断是否是易到注册的
  			/*if(this.$refs.telcode.checkTelnum() && oldVel){
  				this.checkTelnumYidao(newVal)
  			}else if(!this.$refs.telcode.checkTelnum()){  //只要手机号输入不合法，就展示短信验证码
  				this.needMsgcode = true;
  			}*/
  		}
  	},
  	components:{
  		Telcodegroup,
  		Agreecheckbox,
  		Toast,
  		ConfirmMask
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
