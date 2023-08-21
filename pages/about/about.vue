<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<style>
page {
background-color: #ff9e31;
}
</style> 
<template>
	<view class="content">
			<view class="about_60">
				<view class="about_40">
					<text decode="true" class="about_41">访问官网</text>
				</view>
				<text decode="true" class="about_43">https://www.jiabusanyi.com</text>
				<view class="about_44">
					<text decode="true" class="about_45">官方邮箱</text>
					<button v-on:click="btCopy_46_click()" class="btCopy">点击复制
					</button>
					
				</view>
				<text decode="true" class="about_48">jiabusanyi@163.com</text>
				<text decode="true" class="about_50">客户服务热线</text> 
				<text decode="true" class="about_52">17798743931</text>
				<view class="about_53">
					<text decode="true" class="about_54">违法和不良信息举报电话</text>
					
				</view>
				<text decode="true" class="about_56">0510-82721813</text>
				<!-- <text decode="true" class="about_58">营业执照</text>
				<view class="about_49">
					<image v-on:click="about_51_51_click()"  src="/static/images/about_51_51.jpg" mode="scaleToFill" border="0"    class="about_51"></image>
				</view>
				<view class="about_57">
					<image v-on:click="about_59_59_click()"  src="/static/images/about_59_59.jpg" mode="scaleToFill" border="0"    class="about_59"></image>
				</view> -->
				<view class="about_62">
					<image v-on:click="about_22_22_click()"  src="/static/app.png" mode="scaleToFill" border="0"    class="about_22"></image>
					<text decode="true" class="about_35">家步三一</text>
					<text decode="true" class="about_36">Copyright© 2002-2015 版权所有:江苏家步三一超市有限公司 信息产业部备案许可编号 苏ICP备16040763号-1</text>
				</view>
			</view>
			<view class="footer">
				<navigator url="/pages/about/zc">服务协议</navigator>
				<navigator url="/pages/about/ys">隐私政策</navigator>
			</view>

		<view class="loading">{{loadingText}}</view>
	</view>
</template>

<script>
import about from "./about.js";
const app = getApp;
var api = null;
api = require('../../api.js');
// export default about;
export default {
  data() {
    return {
      Tap: false,
      orderType: 'add',
      car: '',
      addressList: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  try {
	      const value = uni.getStorageSync('token');
	      if (value) {
	  		uni.request({
	  		    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
	  		    data: {
	  		        token: value
	  		    },
	  			method:'GET',
	  		    header: {
	  		        'custom-header': "hello", //自定义请求头信息
	  		    },
	  		    success: (res) => {
	  				
	  		    }
	  		});
	      }else{
	  		uni.navigateTo({
	  			url: '/pages/record/record',
	  		    success: res => {console.log('res')},
	  		    fail: () => {console.log('res2')},
	  		    complete: () => {console.log('res3')}
	  		});
	  	}
	  } catch (e) {
	      // error
	  	
	  }
	  
    
  },
  }
</script>

<style lang="scss" scoped>
   @import './about.scss'
</style>