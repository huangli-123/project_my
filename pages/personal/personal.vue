<template>
	<view class="kedetail">
		<view class="head">
			<view class="head_l">
				<image src="../../static/app.png"></iamge>
			</view>
			<view class="head_r">
				<view class="head_r_01">服务号<span>{{refer.referral_code}}</span></view>
				<view class="head_r_02"><span>你的代理商权益时间到期为{{agent_fee.valid_period}}，请及时续费！</span></view>
			</view>
		</view>
		<view class="BH6">
		</view>
		<view class="nav">
			<view class="zk_title_name">
<<<<<<< HEAD
				<view :class="{'active':isActive==1}" @click="click(1)">代理商返现记录</view>
				<view :class="{'active':isActive==2}" @click="click(2)">代理商下单记录</view>
=======
				<view :class="{'active':isActive==1}" @click="click(1)">推荐代理商/商户回款</view>
				<view :class="{'active':isActive==2}" @click="click(2)">商品下单回款</view>
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
			</view>
		</view>
<!-- 		<view class="jytj_tit">推荐商户/代理商返现记录</view> -->
		<view class="jytj" v-if="isActive==1">
			<view class="title_host">
<<<<<<< HEAD
				<text class="free">总金额:10000</text>
				<text class="totlebody">总成员:100</text>
			</view>
			<view class="table">
				<view class="itemhm">订单编号</view>
				<view class="itemhm">返利</view>
				<!-- <view class="itemhm">下单账户</view> -->
				<view class="itemhm">下单时间</view>
=======
				<view>
					<view class="huikuang">
						<text class="totlebody">回款总金额:{{sum}}</text>
						<text class="totlebody">回款已提现:{{collection_sum}}</text>
					</view>
								
					<view class="huikuang">
						<text class="totlebody">回款剩余额:{{remain_collection_sum}}</text>
						<text class="totlebody">下属总成员:{{count}}</text>
					</view>
				</view>
				
				  
	        <view class="tixian">
				<navigator url="/pages/withdrawal/withdrawal" hover-class="navigator-hover">
				<button type="warn">去提现</button>
				</navigator>
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
			</view>
			<view class="orderList" v-if="record">
			    <view v-for="(item, index) in record" :key="index" class="orderItem">
			       <!-- <view wx:for="{{item.detail}}"  wx:key="index"> -->
			          <view class="borderBottom flex alignItems good">
			           <view class="flex alignItems" style="width:100%;">
			            <image src="../../static/app.png"></image>
			            <view class="textcontent flexcolumn justifyBetween">
			              <text class="font-size-25 row1">订单编号：{{item.order_num}}</text>
			              <text class="font-size-25 row1">下单账户：{{item.account}}</text>
						  <text class="font-size-25 row1">订单金额：{{item.price}}</text>
			              <text class="red font-size-25">返现金额:￥{{item.Commission}}</text>
						  <text class="huise font-size-25 row1">{{item.create_time}}</text>
			            </view>
			            </view>
			          </view>
			</view>
		</view>
<<<<<<< HEAD
		<view class="jytj" v-if="isActive==2">
			<view class="title_host">
				<text class="free">总金额:8000</text>
				<text class="totlebody">总成员:400</text>
			</view>
			<view class="table">
				<view class="itemhm">订单编号333</view>
				<view class="itemhm">返利333</view>
				<!-- <view class="itemhm">下单账户</view> -->
				<view class="itemhm">下单时间333</view>
			</view>
			<view class="table" v-for="(item, index) in record" :key="index">
				<view class="itemhm">{{item.order_num}}</view>
				<view class="itemhm">{{item.price}}元</view>
				<!-- <view class="itemhm">{{item.id}}</view> -->
				<view class="itemhm">{{item.create_time}}</view>
			</view>
		</view>
=======
		</view>

	</view>
	<view class="jytj" v-if="isActive==2">
		
		<view class="title_host">
				<view>
					<view class="huikuang">
						<text class="totlebody">回款总金额:{{sum}}</text>
						<text class="totlebody">回款已提现:{{collection_sum}}</text>
					</view>
								
					<view class="huikuang">
						<text class="totlebody">回款剩余额:{{remain_collection_sum}}</text>
						<!-- <text class="totlebody">下属总成员:{{count}}</text> -->
					</view>
				</view>
				
				  
		    <view class="tixian">
				<navigator url="/pages/withdrawal/withdrawal2" hover-class="navigator-hover">
				<button type="warn">去提现</button>
				</navigator>
			</view>
			<view class="orderList" v-if="record">
			    <view v-for="(item, index) in record" :key="index" class="orderItem">
			       <!-- <view wx:for="{{item.detail}}"  wx:key="index"> -->
			          <view class="borderBottom flex alignItems good">
			           <view class="flex alignItems" style="width:100%;">
			            <image src="../../static/app.png"></image>
			            <view class="textcontent flexcolumn justifyBetween">
			              <text class="font-size-25 row1">订单编号：{{item.order_num}}</text>
			              <text class="font-size-25 row1">下单账户：{{item.account}}</text>
						  <text class="font-size-25 row1">订单金额：{{item.total_price}}</text>
			              <text class="red font-size-25"> 返现金额:￥{{item.charge3}}</text>
						  <text class="huise font-size-25 row1">{{item.create_time}}</text>
			            </view>
			            </view>
			          </view>
			</view>
		</view>
		</view>
	</view>
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
	</view>
</template>

<script>
	const app = getApp();
	var api = null;
	api = require("../../api.js");
	import uniIcon from "../../components/uni/uni-icon/uni-icon.vue"  
	export default {
		data() {
			return {
				sex:false,
				record:'',
				agent_fee:'',
				isActive:1,
<<<<<<< HEAD
=======
				sum:'',
				count:'',
				order:'',
				refer:'',
				collection_sum:'',
				remain_collection_sum:'',
				
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
			};
		},
		components: {
			uniIcon 
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  var userIdEnc = wx.getStorageSync('userIdEnc');
		  this.setData({
		    userIdEnc: userIdEnc
		  });
		},
		
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {},
		
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
		  var that = this;
		  if(that.isActive==1){
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
			  		        
			  				if(res.data.status==200){
			  					var user_id = res.data.token.user;
			  					wx.request({
			  					  url: api + '/SupermarketApi/Newagent/personal2',
			  					  // 仅为示例，并非真实的接口地址
			  					  data: {
			  					    user_id: user_id
			  					  },
			  					  header: {
			  					    'content-type': 'application/json' // 默认值
			  					
			  					  },
			  					  method: 'GET',
			  					
			  					  success(res) {
			  					    console.log(res);
			  					    that.setData({
			  					      record: res.data.record,
			  						  agent_fee:res.data.agent_fee,
			  						  refer:res.data.refer,
			  						  sum:res.data.sum,
			  						  count:res.data.count,
			  						  collection_sum:res.data.collection_sum,
			  						  remain_collection_sum:res.data.remain_collection_sum
			  					    });
			  					  }
			  					
			  					});
			  				}else{
			  						uni.redirectTo({
			  							url: '/pages/record/record',
			  						    success: res => {console.log('res')},
			  						    fail: () => {console.log('res2')},
			  						    complete: () => {console.log('res3')}
			  						});
			  					}
			  		    }
			  		});
			      }else{
			  		uni.redirectTo({
			  			url: '/pages/record/record',
			  		    success: res => {console.log('res')},
			  		    fail: () => {console.log('res2')},
			  		    complete: () => {console.log('res3')}
			  		});
			  	}
			  } catch (e) {
			      // error
			  	
			  }
		  }else if(that.isActive==2){
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
			  		        
			  				if(res.data.status==200){
			  					var user_id = res.data.token.user;
			  					wx.request({
			  					  url: api + '/SupermarketApi/Newagent/agent_goods',
			  					  // 仅为示例，并非真实的接口地址
			  					  data: {
			  					    user_id: user_id
			  					  },
			  					  header: {
			  					    'content-type': 'application/json' // 默认值
			  					
			  					  },
			  					  method: 'GET',
			  					
			  					  success(res) {
			  					    console.log(res);
			  					    that.setData({
			  					      record: res.data.record,
			  					      sum:res.data.sum,
			  					      // count:res.data.count,
			  					      collection_sum:res.data.collection_sum,
			  					      remain_collection_sum:res.data.remain_collection_sum
			  					    });
			  					  }
			  					
			  					});
			  				}else{
			  						uni.redirectTo({
			  							url: '/pages/record/record',
			  						    success: res => {console.log('res')},
			  						    fail: () => {console.log('res2')},
			  						    complete: () => {console.log('res3')}
			  						});
			  					}
			  		    }
			  		});
			      }else{
			  		uni.redirectTo({
			  			url: '/pages/record/record',
			  		    success: res => {console.log('res')},
			  		    fail: () => {console.log('res2')},
			  		    complete: () => {console.log('res3')}
			  		});
			  	}
			  } catch (e) {
			      // error
			  	
			  }
		  }

		},
		methods:{
			click(type){
				this.isActive=type;
				console.log(type)
				if(type==1){
					var that = this;
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
										        
												if(res.data.status==200){
													var user_id = res.data.token.user;
													wx.request({
													  url: api + '/SupermarketApi/Newagent/personal2',
													  // 仅为示例，并非真实的接口地址
													  data: {
													    user_id: user_id
													  },
													  header: {
													    'content-type': 'application/json' // 默认值
													
													  },
													  method: 'GET',
													
													  success(res) {
													    console.log(res);
													    that.setData({
													      record: res.data.record,
														  agent_fee:res.data.agent_fee,
														  refer:res.data.refer,
														  sum:res.data.sum,
														  count:res.data.count,
														  collection_sum:res.data.collection_sum,
														  remain_collection_sum:res.data.remain_collection_sum
													    });
													  }
													
													});
												}else{
														uni.redirectTo({
															url: '/pages/record/record',
														    success: res => {console.log('res')},
														    fail: () => {console.log('res2')},
														    complete: () => {console.log('res3')}
														});
													}
										    }
										});
								    }else{
										uni.redirectTo({
											url: '/pages/record/record',
										    success: res => {console.log('res')},
										    fail: () => {console.log('res2')},
										    complete: () => {console.log('res3')}
										});
									}
								} catch (e) {
								    // error
									
								}
				}else if (type==2){
					var that = this;
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
										        
												if(res.data.status==200){
													var user_id = res.data.token.user;
													wx.request({
													  url: api + '/SupermarketApi/Newagent/agent_goods',
													  // 仅为示例，并非真实的接口地址
													  data: {
													    user_id: user_id
													  },
													  header: {
													    'content-type': 'application/json' // 默认值
													
													  },
													  method: 'GET',
													
													  success(res) {
													    console.log(res);
													    that.setData({
														  record: res.data.record,
														  sum:res.data.sum,
														  // count:res.data.count,
														  collection_sum:res.data.collection_sum,
														  remain_collection_sum:res.data.remain_collection_sum
													    });
													  }
													
													});
												}else{
														uni.redirectTo({
															url: '/pages/record/record',
														    success: res => {console.log('res')},
														    fail: () => {console.log('res2')},
														    complete: () => {console.log('res3')}
														});
													}
										    }
										});
								    }else{
										uni.redirectTo({
											url: '/pages/record/record',
										    success: res => {console.log('res')},
										    fail: () => {console.log('res2')},
										    complete: () => {console.log('res3')}
										});
									}
								} catch (e) {
								    // error
									
								}
				}
<<<<<<< HEAD
			} catch (e) {
			    // error
				
			}
		},
		methods:{
			click(type){
				this.isActive=type;
=======
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
			},
		}
	}
</script>

<style lang="scss">
.tixian{
	margin: 0 15px;
	padding: 0 0;
}
.kedetail{
	.head{display: flex;margin: 10px;padding:10px 5px;
		.head_l{position: relative;
			image{width: 55px;height:55px;border-radius: 50%;}
			.sex{position: absolute;right: 0;bottom: 0;
				image{width: 20px;height: 20px;}
			}
		}
		.head_r{padding-left: 10px;
			.head_r_01{font-size: 16px;font-weight: 600;padding:5px 0 15px;
				span{background-color: #FAAB0C;color: #fff;font-weight: 100;font-size: 14px;padding:2px 3px;border-radius: 3px;
				margin-left: 5px;}
			}
			.head_r_02{
<<<<<<< HEAD
				span{background-color: #F2F3F5;border-radius: 3px;color: #3d3d3e;font-size: 12px;margin-right: 5px;padding: 2px 3px;}
=======
				span{border-radius: 3px;color: #3d3d3e;font-size: 12px;margin-right: 5px;padding: 2px 3px;}
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
			}
		}
	}
	.BH6{display: 6px;background-color: #FAFAFA;}
<<<<<<< HEAD
	.title_host{height: 40px;padding: 10px;width:100%;}
=======
	.title_host{height: 40px;padding: 10px 0;width:100%;}
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
	.title_host text{
		padding-left: 15px;
	}
	.jytj_tit{font-size: 15px;font-weight: 600;padding:30px 10px 15px;}
<<<<<<< HEAD
	.jytj{padding: 5px 10px 15px;	
=======
	.jytj{padding: 5px 10px 15px 0px ;	
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
		.con{display: flex;flex-wrap: wrap;justify-content: space-between;;
			.con_01{width: 48%;padding: 10px 0 20px;box-sizing: border-box;
				.con_01_1{color: #A4A5A7;}
				.con_01_2{font-size: 18px;font-weight: 600;padding-top: 20px;line-height: 20px;
					span{padding-left: 10px;}
				}
			}
		}
	}
	.table{
		display: flex;
		flex-direction: row;
		height: 50px;
		line-height: 50px;
	}
	.itemhm{
		width: 45%;
		text-align: center;
		flex-wrap: wrap;
	}
	.nav{
		width: 100%;
		height: 50px;
		line-height: 50px;
	}
	.zk_title_name{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.zk_title_name view{
		width: 48%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-top: 30px;
		background-color: #f2f3f5;
		font-size: 15px;font-weight: 600;
	}
	.active{
		color: #faab0c;
		text-decoration: underline;
	}
<<<<<<< HEAD
=======
	.huikuang{
		display: flex;
		align-items: center;
		margin:20rpx 0;
	}
	.totlebody{
		width: 800rpx;
		
	}
>>>>>>> 7fc151ebe9b4f1d788d808e60c1c2a224f5716aa
}
</style>
<style>
@import "./personal.css";
</style>