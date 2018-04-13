<template>
	<transition name="slide-up-fade">
		<div class="toastmsg" v-show="showToast" v-html="toastMsg"></div>
	</transition>
</template>

<script>
export default {
  name: 'toast',
  props:{
  	delay:{
  		type:Number,
  		default:2000
  	}
  },
  data () {
    return {
      showToast:false,  //吐司提示框的展示与否  false-不展示，true-展示
      toastMsg:''
    }
  },
  methods:{
  	show:function(msg){
  		var vm = this;
			vm.showToast = true;
	 		vm.toastMsg = msg;
	 		clearTimeout(this.timer);
	 		this.timer = setTimeout(function(){
	 			vm.hide();
	 		},2000)
  	},
  	hide:function(){
  		this.showToast = false;
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
