<template>
	<view class="two">
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-orange'" v-for="(item,index) in numList" :key="index">
					<text class="num"  :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<view class="BH5"></view>
		<view class="price">
			<view class="price-01" :class="{xz:all==true}" @click="quanxuan()">
				包年
				<view class="price-01-p text-blue">¥<span>{{set}}</span></view>
				<text>{{set}}元/年</text>
			</view>
			<view class="uni">
						<view class="list" v-for="(item,key) in data" :key="key">
							<view @change="checkboxChange(item,key)">
							<view style="display: flex;justify-content: space-between;">
								<view style="opacity: 0;">
									<view class="radio" >
									</view> {{item.name}}：<text>{{item.price}}</text>￥
								</view>
								<view class="list-list">
									<view class="Button" @click="plus(item)">+</view>
									<view class="number2">{{item.number}}</view>
									<view class="Button" @click="reduce(item)">-</view>
								</view>
							</view>
							</view>
						</view>	
					
				<view class="botton">
					<view class="text">总价：￥<text>{{total}}</text></view>
				</view>
			</view>
		<view class="btn flex flex-direction">
			<button class="cu-btn lg bg-orange" @click="next">立即支付</button>
			<uni-popup ref="popup" type="share" >
			    <uni-popup-share title="选择支付" @select="select"></uni-popup-share>
			</uni-popup>
		</view>
		<!-- <view>
		     <web-view  src="https://www.jiabusanyi.com/SupermarketMobile/"></web-view>
		</view> -->
	</view>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	import UniPopupShare from '../../components/uni-popup/uni-popup-share.vue'
	const app = getApp();
	var api = null;
	api = require("../../api.js");
	export default {
		data() {
			return {
				numList: [{
					name: '提交资质'
				}, {
					name: '选择入驻方式'
				}, {
					name: '等待审核'
				},  ],
				num: 1,
				data:[
				{
					"number": 1000,
					"price": ""
				},],
				zong:[],
				all:false,
			};
		},
		components:{
		       uniPopup,
		       UniPopupShare
		    },
		computed:{
			total(){
				let a = 0
				let zong = this.zong;
				for (let i = 0; i < zong.length; i++) {
					a += zong[i].price * zong[i].number
				}
				return a
			}
		},
		onLoad: function (option) {//option为object类型，会序列化上个页面传递的参数
			var that = this;
			uni.request({
			  url: api + '/SupermarketApi/Agent/agentAnnualFee',
			  // 仅为示例，并非真实的接口地址
			  data: {
			  },
			  header: {
			    'content-type': 'application/json' // 默认值
			
			  },
			  method: 'GET',
			
			  success(res) {

			    var detailData = res.data;
			    console.log(res);
				that.setData({
					set:res.data.price,
				})
			    that.setData({
					data:[
					{
						"name":res.data.name,
						"number": 1,
						"price": res.data.price,
					},]
			    }); 
			
			  }
			});
		    },
		onShow() {
			let data = this.data
			for (let i = 0; i < data.length; i++) {
				this.data[i]['state'] = false
				this.data[i]['id'] = i
			}	
		},
		methods:{
			next(){
				this.$refs.popup.open();
				
			},
			select(e, done) {
							// uni.showToast({
							// 	title: `您选择了第${e.index+1}项：${e.item.text}支付`,
							// 	icon: 'none'
							// })
							done();
							if(e.index==0){
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
													  var that = this;
													  var total_fee = that.total;
													  var number = that.data.number; 
														 if(!number){
														 	number=1;
														 }
													console.log(that.data);
													console.log(total_fee);
													// console.log(order_num);
													console.log(number);
													      if (total_fee != null ) {
															  wx.request({
															      url: api + '/SupermarketApi/Order/pay22',
															        method: "POST",
															        data: {
															          total_fee: total_fee,
															          payment_type: 0,
																	  number:number,
																	  user_id:user_id
															        },
															        header: {
															          'content-type': 'application/x-www-form-urlencoded' // 默认值
															      									  
															        },
															        success: function (res) {
															          //后端返回的数据
															          var data = res.data;
															          console.log('data');
															          console.log(data);
															          
															      		uni.requestPayment({
															      		    provider: 'wxpay',
															      		    orderInfo: data, //微信、支付宝订单数据
															      		    success: function (res) {
															      		        console.log('success:' + JSON.stringify(res));
																				uni.showToast({
																				    title: '支付成功',
																				    duration: 2000
																				});
																				setTimeout(function () {
																				  uni.hideToast();
																				  uni.redirectTo({
																				  	url: '/pages/commission/three',
																				      success: res => {console.log(res)},
																				      fail: (res) => {console.log(res)},
																				      complete: (res) => {console.log(res)}
																				  }); 
																				}, 1000);
															      		    },
															      		    fail: function (err) {
															      		        console.log('fail:' + JSON.stringify(err));
																				uni.showToast({
																				    title: '支付失败',
																				    duration: 2000
																				});
															      		    }
															      		});							  					  
															        }
															      });          
													      }
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
							}else if(e.index==1){
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
													  var that = this;
											          var total_fee = that.total;
											         // var order_num = that.order_num;
											          var number = that.data.number;
													   if(!number){
													   	number=1;
													   }   
													console.log(total_fee);
													console.log(that.data.number);
													console.log(number);
													console.log(user_id);
													      if (total_fee != null ) {
															  wx.request({
															      url: api + '/SupermarketApi/Order/payalipay',
															        method: "POST",
															        data: {
															          total_fee: total_fee,
															          payment_type: 1,
																	  number:number,
																	  user_id:user_id
															        },
															        header: {
															          'content-type': 'application/x-www-form-urlencoded' // 默认值
															      									  
															        },
															        success: function (res) {
															          //后端返回的数据
															          var data = res.data;
															          console.log('data');
															          console.log(data);
															          
															      		uni.requestPayment({
															      		    provider: 'alipay',
															      		    orderInfo: data, //微信、支付宝订单数据
															      		    success: function (res) {
															      		        console.log('success:' + JSON.stringify(res));
																				uni.showToast({
																				    title: '支付成功',
																				    duration: 2000
																				});
																				setTimeout(function () {
																				  uni.hideToast();
																				  uni.redirectTo({
																				  	url: '/pages/commission/three',
																				      success: res => {console.log(res)},
																				      fail: (res) => {console.log(res)},
																				      complete: (res) => {console.log(res)}
																				  }); 
																				}, 1000);
															      		    },
															      		    fail: function (err) {
															      		        console.log('fail:' + JSON.stringify(err));
																				uni.showToast({
																				    title: '支付失败',
																				    duration: 2000
																				});
															      		    }
															      		});							  					  
															        }
															      });          
													      }
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
			checkboxChange(value,key){//checkbox 改变触发事件
			console.log(value);
				if(value.state == false){
					this.data[key]['state'] = true
					this.zong.push(value);
				}else if(value.state == true){
					this.data[key]['state'] = false
					let zong = this.zong;
					let cid = value.id;
					for (let i = 0; i < zong.length; i++) {
						if(zong[i].id == cid){
							console.log(zong);
							zong.splice(i,1)
						}
					}
				}
				if(this.data.length == this.zong.length){
					this.all = true
				}else{
					this.all = false
				}
			},
			plus(value){//加1
			console.log(value);
				if(value.state == false){
					value.number = Number(value.number)+1
					this.data.number = value.number;
				}else if(value.state == true){
					value.number = Number(value.number)+1
					this.data.number = value.number;
					let zong = this.zong;
					let cid = value.id;
					let _this = this;
					for (let i = 0; i < zong.length; i++) {
						if(zong[i].id == cid){
							Number(_this.zong[i].number)+1
						}
					}
				}
			},
			reduce(value){//减一
					console.log(value);
				if(value.state == false){
					if(value.number <= 1){
						uni.showToast({
							icon:"none",
							title:"不能小于1"
						})
						return false
					} else if(value.number >= 1){
						value.number = Number(value.number)-1
						this.data.number = value.number;
					}
				}else if(value.state == true){
					
					if(value.number <= 1){
						uni.showToast({
							icon:"none",
							title:"不能小于1"
						})
						return false
					}
					value.number = Number(value.number)-1
					this.data.number = value.number;
					let zong = this.zong;
					let cid = value.id;
					let _this = this;
					for (let i = 0; i < zong.length; i++) {
						if(zong[i].id == cid){
							let num = Number(_this.zong[i].number)
							if(num <= 1){
								uni.showToast({
									icon:"none",
									title:"不能小于1"
								})
								return false
							}else if(num >= 1){
								Number(_this.zong[i].number)-1
							}
						}
					}
				}
			},
			quanxuan(){
				let _this = this;
				let data = this.data;
				if(this.all == true){
					this.all = false
					for (let i = 0; i < data.length; i++) {
						_this.data[i]['state'] = false
					}
					this.zong = [];
				}else if(this.all == false){
					this.all = true;
					for (let i = 0; i < data.length; i++) {
						_this.data[i]['state'] = true
						this.zong.push(_this.data[i]);
					}
					
				}
			}
		}
	}
</script>

<style lang="scss">
.two{
	.BH5{background-color: #F3F5F4;height: 4px;}
	.price{display: flex;padding: 20px 10px;justify-content: space-between;
		.price-01{border: 2px solid #F8F8F8;border-radius: 3px;width: 150px;text-align: center;padding: 20px 0;font-weight: 600;
		font-size: 16px;
			.price-01-p{padding: 18px 0 13px;color: #FF5300;
				span{font-size: 20px;padding-left: 5px;}
			}
			text{color: #B0B1B5;font-size: 14px;font-weight: 500;}
		}
		.xz{border: 2px solid #FF5300;}
	}
	.H50{height: 50px;}
	.btn{position: fixed;bottom: 0; left:0;padding: 10px;width: 100%;background-color: #fff;z-index: 9;}
	.list-list{display: flex;flex-direction: row;width: 80px;height: 100px;}
	.list .Button{
		border: 1px solid #999595;
		width: 50upx;
		height: 48upx;
		text-align: center;
		line-height: 48upx;
	}
	.number2{
		font-size: 30upx;
		height: 48upx;
	    line-height: 48upx;
		border: 1px solid #999595;
		border-left:none;
		border-right: none ;
		padding: 0upx 30upx;}
}



</style>
