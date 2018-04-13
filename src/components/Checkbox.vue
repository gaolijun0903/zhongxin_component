<template>
  <div class="agreement">
	  <div class="checkboxwrapper">
			<div class="checkbox" :class="{'checked':isAgree}" @click="togglecheck"></div>
		</div>
		<div class="agreementcontent">
			同意
			<a class="agreeitem" href="https://www.yongche.com/cms/page/zhongxinApplyNotice.html">《中信银行在线借记卡申请须知》</a>
			<a class="agreeitem" href="https://www.yongche.com/cms/page/zhongxinApplyNotice2.html">《中信银行易到联名借记卡申请须知》</a>
			<a class="agreeitem" href="#">《易到用车客户协议》</a>
			等法律声明及政策
		</div>
  </div>
</template>

<script>
export default {
  name: 'agreementcheckbox',
  data () {
    return {
      isAgree:false  //是否同意各种协议 , 默认是未选中
    }
  },
  methods:{
  	togglecheck:function(){ //是否同意协议
			this.isAgree  = !this.isAgree;
			this.$emit('check',this.isAgree) 
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
