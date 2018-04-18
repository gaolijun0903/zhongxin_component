<template>
  <div class="telcode-wrapper">
   <ul class="tellist">
						<li class="panelitem border telnumwrapper">
							<div class="item-left">手机号码</div>
							<div class="item-right">
								<input type="tel" v-model="telnumInput" placeholder="请填写手机号码"  maxlength="11"/>
							</div>
						</li>
						<li class="panelitem border imgcodewrapper" v-show="needImgcode">
							<div class="code-left">
								<input type="text" v-model="imgcodeInput" placeholder="图形验证码" maxlength="4"/>
							</div>
							<div class="code-right " @click="getImgCode">
								<span class="changeimg">看不清，换一张</span>
								<img ref="imgcode" class="imgcode" :src="imgcodeSrc">
							</div>
						</li>
						<li class="panelitem border msgcodewrapper" v-show="needMsgcode">
							<div class="code-left">
								<input type="tel"  v-model="msgcodeInput" placeholder="请填写验证码" maxlength="6"/>
							</div>
							<div class="code-right" @click="getmsgcode">
								<div class="getcodebtn" :class="ablegetmsgcode" v-if="isActive">获取验证码</div>
								<div class="getcodebtn" v-else="isActive">重新获取<span id="counttime">{{counttime}}</span>s</div>
							</div>
						</li>
		</ul>
  </div>
</template>

<script>
import {checkTelnumYidaoApi,getCodeApi} from 'api/telcode'	
export default {
  name: 'result',
  data () {
    return {
      telnumInput:null,   //输入的手机号，后台接口返回后赋值
	  	msgcodeInput:null,   //输入的短信验证码
	  	imgcodeInput:null,  //输入的图形验证码
	  	imgcodeSrc:'https://market.yongche.com/activity/Webuser/getCaptcha?',   //图形验证码地址
	  	needMsgcode:false, //是否需要短信验证码，false-不需要，true-需要，默认手机号是后台带来的信息，不需要短信验证码
	  	needImgcode:false, //是否需要图形验证码：false-不需要， true-需要 ，默认不需要图形验证码
	  	counttime:60,  //获取短信验证码倒计时
	  	isActive:true,  //获取短信验证码，是否倒计时状态，  true-不倒计时，false-倒计时状态
	  	ableToClick:true //获取短信验证码,按钮是否可点击，阻止连续点击
    }
  },
  computed:{
		ablegetmsgcode:function(){  //获取短信验证码按钮状态
			return (this.checkTelnum()) ? 'able' : 'disable';    //手机号不合格，按钮置灰，不可点击
		}
	},
  methods:{
  	getImgCode:function(){//获取图片验证码
			this.imgcodeSrc =  'https://market.yongche.com/activity/Webuser/getCaptcha?t='+new Date().getTime();
			console.log(this.imgcodeSrc);
		},
		getmsgcode:function(){//获取短信验证码
			if(!this.ableToClick){//是否可点击，阻止连续点击
				return 
			}
			if(!this.checkTelnum()){
				this.showToastFn('请输入正确的手机号');
				return false;
			}
			if(this.needImgcode && !this.imgcodeInput){  //需要图形验证码,并且图形验证码为空
				this.showToastFn('请输入图形验证码');
                return false;
			}
			this.ableToClick = false;
			this.sendMsgcode();//发送短信验证码
		},
		checkTelnum:function(){  //检测手机号是否合法
			if(!(/^1(?:[38]\d{3}|4[57]\d{2}|5[0-35-9]\d{2}|6[68]\d{2}|7(?:[0-35-8]\d{2}|40[0-5])|9[89]\d{2})\d{6}$/.test(this.telnumInput))){
	        return false;
	    }
	    return true;
		},
		checkTelnumYidao:function(tel){ //判断手机号，是否为易到注册的，由此决定是否需要短信验证码
			var vm = this;
			checkTelnumYidaoApi().then((data)=>{
				console.log('checkTelnumYidaoApi')
				if(tel==='16801010040' || tel==='16801010041'){
					vm.needMsgcode = false; //是易到的，不用短信验证
				}else{
					console.log('不是易到注册的，需要短信验证码')
					vm.needMsgcode = true;
				}
			})
			
		},
		sendMsgcode:function(){
			console.log('发送短信验证码')
			console.log(this.telnumInput)
			console.log(this.imgcodeInput)
			var vm = this;
			getCodeApi(this.telnumInput,this.imgcodeInput).then(()=>{
				console.log(data);
                    if(data.code==401){//需要图形验证码，图形验证码展示
                        vm.needImgcode = true;
                        vm.ableToClick = true; //可以再次请求获取验证码
                    }else if(data.code == 200){ //无需图形验证码，开始短信验证码倒计时
						vm.msgcodeCountdown();
                    }else if(data.code == 429) {
                    	vm.ableToClick = true;
                        if(vm.needImgcode){
                           vm.getImgCode();
                        }
                        alert('请求次数过多,请稍后重试')
                    }else if(data.code == 400){
                        vm.showToastFn('图形验证码错误');
                        vm.ableToClick = true;
                        vm.needImgcode = true;
                        if(data.isUpdate ){
                            vm.getImgCode();
                        }
                    }else if(data.code == 449) {
                        vm.showToastFn('请求太频繁');
                        vm.ableToClick = true;
                        if(vm.needImgcode){
                            vm.getImgCode();
                        }
                    }
			})
		},
		msgcodeCountdown:function(){//短信验证码发送后，倒计时
			var vm = this;
			vm.isActive = false;
	    var countdown = setInterval(function(){
	        if (vm.counttime <= 0) {
	        	vm.counttime = 60;
	        	vm.isActive = true;
	        	vm.ableToClick = true;
	            clearInterval(countdown);
	            return 
	        }
	        vm.counttime--;
	    }, 1000);
		}
  },
  watch:{
  		telnumInput:function(newVal,oldVel){  //监测手机号输入变化，判断是否是易到注册的
  			if(this.checkTelnum() && oldVel){
  				this.checkTelnumYidao(newVal)
  			}else if(!this.checkTelnum()){  //只要手机号输入不合法，就展示短信验证码
  				this.needMsgcode = true;
  			}
  		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
