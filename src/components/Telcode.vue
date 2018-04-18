<template>
	<li class="panelitem border msgcodewrapper">
		<div class="code-left">
			<input type="tel"  v-model="msgcodeInput" placeholder="请填写验证码" maxlength="6"/>
		</div>
		<div class="code-right" @click="getmsgcode">
			<div class="getcodebtn" :class="ablegetmsgcode" v-if="isActive">获取验证码</div>
			<div class="getcodebtn" v-else="isActive">重新获取<span id="counttime">{{counttime}}</span>s</div>
		</div>
	</li>
</template>

<script>
import {getCodeApi} from 'api/telcode'	
export default {
  name: 'result',
  data () {
    return {
    	msgcodeInput:null,   //输入的短信验证码
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
	sendMsgcode:function(){
		console.log('发送短信验证码')
		console.log(this.telnumInput)
		console.log(this.imgcodeInput)
		var vm = this;
		getCodeApi(this.telnumInput,this.imgcodeInput).then(()=>{
			console.log(data);
				vm.ableToClick = true; //可以再次请求获取验证码
                if(data.code==401){//需要图形验证码，图形验证码展示
                    vm.needImgcode = true;
                    
                }else if(data.code == 200){ //无需图形验证码，开始短信验证码倒计时
                	vm.ableToClick = false;
					vm.msgcodeCountdown();
                }else if(data.code == 429) {
                    if(vm.needImgcode){
                       vm.getImgCode();
                    }
                    alert('请求次数过多,请稍后重试')
                }else if(data.code == 400){
                    vm.showToastFn('图形验证码错误');
                    vm.needImgcode = true;
                    if(data.isUpdate ){
                        vm.getImgCode();
                    }
                }else if(data.code == 449) {
                    vm.showToastFn('请求太频繁');
                    if(vm.needImgcode){
                        vm.getImgCode();
                    }
                }
            this.$emit('onGetcode',vm.needImgcode)
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
  		
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
