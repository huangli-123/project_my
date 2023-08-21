<template>
	<view>
		<view class="quan">
			<view class="tixian">
				<view><text>支付宝订单可提现（元）</text></view>
				<view><text class="jiner">{{alipay_remain_collection_sum}}</text></view>
			</view>
			<view class="bangding">
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png"></image>
				<view class="qubangding" v-if="user">
					  <text style="color:#000000; margin-right: 20rpx;" >{{user.alipay_name}}</text>
					  <text style="color:#000000" >{{user.alipay_account}}</text>
					  <button style="display:inline; float:right;margin-right: 5rpx;" size="mini" type="default" @click="bind_alipay">修改</button>
				</view>
				<view class="qubangding" v-else>
					<navigator url="/pages/bindPayment/bindAlipay" hover-class="navigator-hover">
					绑定支付宝账号>>>
					</navigator>
				</view>
				<view style="margin:30px 10px;border-bottom: thin solid #818181;">
					<text style="color:#000000;">提现金额</text>
					<input placeholder="请输入提现金额" style="margin-top: 20px;" v-model="withdrawal_amount" placeholder-style="font-family: 'Courier New', Courier, monospace;font-size:smaller;" />			
				</view>
			</view>
			<view class="qutixian" @click="tixian"><text>提现</text></view>	
		</view>
		<!-- <view class="quan">
			<view class="tixian">
				<view><text>微信订单可提现（元）</text></view>
				<view><text class="jiner">88.80</text></view>
			</view>
			<view class="bangding">
				<text class="zhifubao">去绑定微信</text>
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png"></image>
			</view>
			<view class="qutixian"><text>提现</text></view>	
		</view> -->
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
				alipay_name:'',
				alipay_account:'',
				alipay_remain_collection_sum:'',
				withdrawal_amount:'',
				rules:{
				        withdrawal_amount:{
				        rule:/\S/,
				        msg:"提现金额不能为空"
				        },
						user:{
						rule:/\S/,
						msg:"请绑定支付宝账号"
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
							  url: api + '/SupermarketApi/Newagent/find_bind_alipay2',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    user_id: user_id
							  },
							  header: {
							    'content-type': 'application/x-www-form-urlencoded',
							    'Accept': 'application/json'
							  },
							  method: 'POST',
							
							  success(res) {
								  console.log(res)
								  that.setData({
									  alipay_remain_collection_sum:res.data.alipay_remain_collection_sum
								  });
							    if (res.data.code == 2) {
							      // wx.showLoading({
							      //   title: '还没有绑定支付宝，去绑定吧'
							      // });
							      // setTimeout(function () {
							      //   wx.hideLoading();
							      // }, 5000);
							    } else {
							      that.setData({
							        user: res.data.user
							      });
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
			tixian(){
				let	withdrawal_amount=this.withdrawal_amount;
				let user=this.user;
				if(!this.validate('user')) return;
				if(!this.validate('withdrawal_amount')) return;
					
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
											  url: api + '/SupermarketApi/Order/alipay_transfer',
											  // 仅为示例，并非真实的接口地址
											  data: {
											    user_id: user_id,
												withdrawal_amount:withdrawal_amount,
												alipay_account:user.alipay_account,
												alipay_name:user.alipay_name,
												classification:1
											  },
											  header: {
											    'content-type': 'application/x-www-form-urlencoded',
											    'Accept': 'application/json'
											  },
											  method: 'POST',
											
											  success(res) {
												  console.log(res)
											    uni.showToast({
											        title: res.data.msg,
											    });
												setTimeout(function() {
													uni.navigateBack({
													    delta: 1
													});
												}, 2000);
												
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
			   // uni.request({
			   //     url: 'https://www.jiabusanyi.com/SupermarketApi/Order/alipay_transfer', //仅为示例，并非真实接口地址。
			   //     data: {
			           
			   //     },
			   // 	method:'POST',
			   //     header: {
			   //       'content-type': 'application/json' // 默认值
			       			  
			   //     },
			   //     success: (res) => {
			   //         console.log(res);
			   //     }
			   // })
			},
			bind_alipay(){
				uni.navigateTo({
					url:'/pages/bindPayment/bindAlipay'
				})
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
	.quan{
		margin:0 0 80px 0;
		padding: 0 0 1px 0;
		background:#fff;
	}
	.tixian{
		height: 100px;
		width: 100%;
		background-image:linear-gradient(to right,rgb(85, 54, 253),rgb(36, 177, 251));
		}
	.tixian view{
		margin: 10px 10px;	
	}
	text{
		color: #FFFFFF;
	}
	.jiner{
		font-family: 'Courier New', Courier, monospace;
		font-size: xx-large;
	}
	.bangding{
		height: 150px;
		width: 100%;
		margin: 0 0;
	}
	.qubangding{
		padding-top: 15px;
		padding-left: 40px;
	}
	.qutixian{
		height: 40px;
		margin: 10px 10px;
		background-image:linear-gradient(to right,rgb(85, 54, 253),rgb(36, 177, 251));
		text-align: center;
		line-height: 40px;
	}
	image{
		height: 35px;
		width: 35px;
		float: left;
		margin: 10px 10px;
	}
   .zhifubao{
	   margin-left: 40px;
	   line-height:50px ;
	   color: #000000;
   }
</style>
