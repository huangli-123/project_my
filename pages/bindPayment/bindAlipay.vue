<template>
	<view>
		<view class="alipay">
			<image src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png"></image>
		</view>
		<view class="view">
			<text>姓名：</text>
			<input placeholder="请输入姓名"   v-model="alipay_name" placeholder-style="font-family: 'Courier New', Courier, monospace;font-size:smaller;" />
		</view>
		<view class="view">
			<text>支付宝：</text>
			<input placeholder="请输入支付宝账号" v-model="alipay_account" placeholder-style="font-family: 'Courier New', Courier, monospace;font-size:smaller;"/>
		</view>
		<view class="button">
			 <button type="primary" @click="bind_alipay">下一步</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	var api = null;
	api = require("../../api.js");  
	export default {
		data() {
			return {
				sex:false,
				user:'',
			    name:'',
				alipay:'',
				alipay_name:'',
				alipay_account:'',
				rules:{
				        alipay_name:{
				        rule:/\S/,
				        msg:"姓名不能为空"
				        },
						alipay_account:{
						rule:/\S/,
						msg:"支付宝账号不能为空"
						},
				                 
					},
			};
		},
		components: {
			
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
				
		},
		
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {},
		
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
	
		},
		methods:{
			bind_alipay(){
				if(!this.validate('alipay_name')) return false;
				if(!this.validate('alipay_account')) return;
				
				
				let alipay_name =this.alipay_name;
				let	alipay_account=this.alipay_account;	
				console.log(alipay_account);
				console.log(alipay_name);
				try {
					 var that = this;
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
										console.log(res)
										if(res.data.status==200){
											var user_id = res.data.token.user;
											wx.request({
											  url: api + '/SupermarketApi/Newagent/bindAliapy',
											  // 仅为示例，并非真实的接口地址
											  data: {
											    user_id: user_id,
												alipay_account:alipay_account,
												alipay_name:alipay_name 
											  },
											  header: {
											    'content-type': 'application/x-www-form-urlencoded',
											    'Accept': 'application/json'
											  },
											  method: 'POST',
											
											  success(res) {
												  console.log(res)
											    if (res.data.code == 1) {
											      wx.showLoading({
											        title: '绑定成功'
											      });
											      setTimeout(function () {
											        wx.hideLoading();
													uni.navigateTo({
														url:'/pages/withdrawal/withdrawal'
													})
											      }, 1000);
											    } else {
											      console.log(res);
											    }
											  }
										})
				         }else{
				                 uni.redirectTo({
										  url: '/pages/record/record',
											success: res => {console.log('res')},
											fail: () => {console.log('res2')},
											complete: () => {console.log('res3')}
										});
									}
									}
								})
								}
				}catch (e) {
				  // error
													
				   }
			},
			validate(key){
			                let bool=true;
			                if(!this.rules[key].rule.test(this[key])){
			                    //提示信息
			                    uni.showToast({
			                        title:this.rules[key].msg,
									icon: 'none',
									duration: 2000,
			                    })
			                    //取反
			                    bool=false;
			                    return false;
			                }
			                return bool;
			            },
		}
	}
</script>

<style>
	page{
	  background:#f1f1f1;
	}
    .alipay{
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 80rpx 0;
	}
	image{
		height: 150rpx;
		width: 150rpx;
	}
	.view{
		margin: 50rpx 20rpx;
		border-bottom: thin solid #818181;
	}
	.button{
		margin: 160rpx 100rpx;
	}
</style>
