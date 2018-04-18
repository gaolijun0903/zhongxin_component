<template>
	<li class="panelitem border telnumwrapper">
		<div class="item-left">手机号码</div>
		<div class="item-right">
			<input type="tel" v-model="telnumInput" placeholder="请填写手机号码"  maxlength="11"/>
		</div>
	</li>
</template>

<script>
import {checkTelnumYidaoApi} from 'api/telcode'	
export default {
  name: 'result',
  data () {
    return {
      telnumInput:null,   //输入的手机号，后台接口返回后赋值	  	
	  	needMsgcode:false //是否需要短信验证码，false-不需要，true-需要，默认手机号是后台带来的信息，不需要短信验证码
    }
  },
  methods:{
  	setVal:function(val){
  		this.telnumInput = val;
  	},
		checkTelnum:function(){  //检测手机号是否合法
			if(!(/^1(?:[38]\d{3}|4[57]\d{2}|5[0-35-9]\d{2}|6[68]\d{2}|7(?:[0-35-8]\d{2}|40[0-5])|9[89]\d{2})\d{6}$/.test(this.telnumInput))){
	        return false;
	    }
	    return true;
		},
		checkTelnumYidao:function(tel){ //判断手机号，是否为易到注册的，由此决定是否需要短信验证码
			checkTelnumYidaoApi(tel).then((data)=>{
				console.log('checkTelnumYidaoApi')
				if(tel==='16801010040' || tel==='16801010041'){
					this.needMsgcode = false; //是易到的，不用短信验证
				}else{
					console.log('不是易到注册的，需要短信验证码')
					this.needMsgcode = true;
				}
				this.$emit('change',tel,this.needMsgcode);
			})
		}
  },
  watch:{
  		telnumInput:function(newVal,oldVel){  //监测手机号输入变化，判断是否是易到注册的
  			if(this.checkTelnum() && oldVel){
  				this.checkTelnumYidao(newVal)
  			}else if(!this.checkTelnum()){  //只要手机号输入不合法，就展示短信验证码
  				this.needMsgcode = true;
  				this.$emit('change',newVal,this.needMsgcode);
  			}
  		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
