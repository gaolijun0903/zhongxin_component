<template>
	<transition name="confirm-fade">
	   <div class="resultwrapper maskwrapper" v-show="showFlag" @click.stop>
				<div class="maskinner">
					<div class="masktitle">
						您当前定位城市无中信银行网点
					</div>
					<div class="masksubtitle">
						如需继续申请中信银行卡可手动选择申请城市
					</div>
					<div class="maskbtnwrapper">
						<div id="changeCity" class="maskbtn btnchange" @click="hide">更换城市</div>
						<div class="maskbtn btncancle" @click="hide">暂不申请</div>
					</div>
				</div>
			</div>
	</transition>
</template>

<script>
export default {
  name: 'confirmmask',
  data () {
    return {
      showFlag:false
    }
  },
	methods:{
		show(){
			this.showFlag = true;
		},
		hide(){
			this.showFlag = false;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
