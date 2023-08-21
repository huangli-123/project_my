<template>
<view class="container">
    <!-- <view class="address flex alignItems">
       <text class="iconfont icon-shouhuodizhi"></text>
       <view>
          <view class="flex alignItems">
            <view class="tuzhang">服务天使</view>
            <text class="bold marginLeft">{{newagent.agent_name}}</text>            
          </view>
          <view class="quhuo">取货地址：{{newagent.address}}</view>
       </view>
    </view> -->
    
      <navigator v-if="address" class="address flex justifyBetween alignItems" :url="'/pages/addressList/addressList?car=' + car + '&type=' + ordertype">
        <view class="flex alignItems">
        <text class="iconfont icon-shouhuodizhi"></text>
        <view>
            <view class="flex alignItems">
              <view class="tuzhang">收货地址</view>
              <text class="marginLeft">{{address.user_name}}</text> 
              <text class="marginLeft font-size-25 huise">{{address.user_phone}}</text>           
            </view>
            <view class="quhuo">{{address.area_id1}}{{address.area_id2}}{{address.area_id3}}{{address.address}}</view>
        </view>
        </view>
        <text class="iconfont icon-icon_arrow_right"></text>
    </navigator>
    <navigator v-else class="address flex alignItems" :url="'/pages/addAddress/addAddress?car=' + car + '&type=' + ordertype">
       <text class="iconfont icon-shouhuodizhi"></text>
       <text class="marginLeft">还没有地址哦，去添加吧~</text>
    </navigator>
    

    <view v-for="(item, index) in order" :key="index" class="goodsList">
       <view class="dianpu">
           <view class="dianpuTitle flex alignItems">
              <image :src="item.shop_image"></image>
              <text class="huise shoptitle">{{item.merchant}}</text>
           </view>
           <view v-for="(item, index2) in item.group" :key="index2" class="dianpuContent flex">
                 <image :src="item.photo"></image>
                 <view class="goods flexcolumn justifyBetween">
                    <view class="flexcolumn">
                       <text>{{item.goods_title}}</text>
                       <text v-for="(item, index) in item.unit" :key="index" class="huise font-size-20">{{item.spec_name}}：{{item.title}}</text>
                    </view>
                    <view class="flex justifyBetween alignItems">
                        <view>
                            <text class="symbol">￥</text>
                            <text class="price">{{item.price}}</text>
                            <!-- <text class="originalPrice">￥199</text> -->
                        </view>
                        <view>x {{item.buy_num}}</view>
                    </view>
                 </view>
            </view>
         </view>
       </view>
       <!-- <view class="youhuiquan flex justifyBetween alignItems">
          <text>优惠券</text>
          <navigator class="flex alignItems huise">
            <text>暂无可用</text>
            <text class="iconfont icon-icon_arrow_right"></text>
          </navigator>
       </view> -->
       <view class="youhuiquan flex justifyBetween alignItems">
            <text>商品金额</text>          
            <text>￥{{pricesum}}</text>      
       </view>
       <view style="width:100%;height:150rpx;"></view>
       <view class="bottom flex justifyEnd alignItems">
           <view>
             <text>实付金额：</text>
             <text class="red">￥{{pricesum}}</text>
           </view>
           <!-- <view class="goPay" @tap="zhifu" :data-num="order_num" :data-price="pricesum">去支付</view> -->
		   <view class="btn flex flex-direction">
		   	<button class="goPay" @click="next" :data-num="order_num" :data-price="pricesum">去支付</button>
		   	<uni-popup ref="popup" type="share" >
		   	    <uni-popup-share title="选择支付" @select="select"></uni-popup-share>
		   	</uni-popup>
		   </view>
       </view>
</view>
</template>

<script>
// pages/confirmOrder/confirmOrder.js
import uniPopup from '../../components/uni-popup/uni-popup.vue'
import UniPopupShare from '../../components/uni-popup/uni-popup-share.vue'
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      address: "",
      // newagent: "",
      total_fee: "",
      order_num: "",
      ordertype: "",
      car: "",
      order: "",
      pricesum: ""
    };
  },

  components: {
	  uniPopup,
	  UniPopupShare
  },
 
  props: {},
  onLoad: function (options) {
    console.log('options');
    console.log(options);
    console.log('options');
    
    // var openid = wx.getStorageSync('code');
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
						if (options.addressid) {
						  wx.request({
						    url: api + '/SupermarketApi/My/findaddress22',
						    // 仅为示例，并非真实的接口地址
						    data: {
						      user_id: user_id,
						      address_id: options.addressid
						    },
						    header: {
						      'content-type': 'application/x-www-form-urlencoded',
						      'Accept': 'application/json'
						    },
						    method: 'POST',
						
						    success(res) {
						      console.log(res);
						      that.setData({
						        address: res.data.address
						      });
						    }
						
						  });
						} else {
						  wx.request({
						    url: api + '/SupermarketApi/My/findaddress1',
						    // 仅为示例，并非真实的接口地址
						    data: {
						      user_id: user_id,
						    },
						    header: {
						      'content-type': 'application/x-www-form-urlencoded',
						      'Accept': 'application/json'
						    },
						    method: 'POST',
						
						    success(res) {
						      console.log(res);
						      that.setData({
						        address: res.data.address
						      });
						    }
						
						  });
						}
						
						that.setData({
						  ordertype: options.type,
						  car: options.car
						});
						var type = options.type;
						
						if (type == 'zhijie') {
						  // var newagent = wx.getStorageSync('newagent');
						  // var openid = wx.getStorageSync('code');
						  // this.setData({
						  //   newagent: newagent
						  // });
						  var zhijie = JSON.parse(options.car);
						  var goods = [];
						  goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + user_id + '/');
						  // goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + unionId + '/' + newagent.agent_id);
						  var that = this;
						  wx.request({
						    url: api + '/SupermarketApi/Order/goodsDetail1',
						    // 仅为示例，并非真实的接口地址
						    data: {
						      goods: goods
						    },
						    header: {
						      'content-type': 'application/x-www-form-urlencoded',
						      'Accept': 'application/json'
						    },
						    method: 'POST',
						
						    success(res) {
						      console.log(res);
						      that.setData({
						        order: res.data.order.order,
						        pricesum: res.data.pricesum
						      });
						    }
						
						  }); 
						} else if (type == 'gouwuche') {
						  // var newagent = wx.getStorageSync('newagent');
						  // var openid = wx.getStorageSync('code');
						  // this.setData({
						  //   newagent: newagent
						  // });
						  var cartgoods = JSON.parse(options.car);
						  var goods = [];
						
						  for (var i = 0; i < cartgoods.length; i++) {
						    goods.push(cartgoods[i].cart_id + '/' + cartgoods[i].buy_num);
						  }
						
						  var that = this;
						  wx.request({
						    url: api + '/SupermarketApi/Order/goodsDetail222',
						    // 仅为示例，并非真实的接口地址
						    data: {
						      goods: goods,
						      user_id: user_id,
						      // newagent_id: newagent.agent_id
						    },
						    header: {
						      'content-type': 'application/x-www-form-urlencoded',
						      'Accept': 'application/json'
						    },
						    method: 'POST',
						
						    success(res) {
						      console.log(res);
						      that.setData({
						        order: res.data.order,
						        pricesum: res.data.pricesum // order_num: res.data.order_num
						
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
	
  },
onBackPress:function() {  
		  uni.reLaunch({
		      url: '/pages/shoppingCar/shoppingCar',
		      success: function(e) {
		          // var page = getCurrentPages().pop();
		          // if (page == undefined || page == null) return;
		          // page.onLoad();
		      },
			  
		  });
		  return true;

		},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
	  
    /**
     * 生命周期函数--监听页面加载
     */
    zhifu: function (e) {
		// try {
		//     const value = uni.getStorageSync('token');
		//     if (value) {
		// 		uni.request({
		// 		    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
		// 		    data: {
		// 		        token: value
		// 		    },
		// 			method:'GET',
		// 		    header: {
		// 		        'custom-header': "hello", //自定义请求头信息
		// 		    },
		// 		    success: (res) => {
		// 		        var user_id = res.data.token.user;
		// 				if(res.data.status==200){
		// 					// var openid = wx.getStorageSync('code');
		// 					wx.request({
		// 					  url: api + '/SupermarketApi/My/findaddress1',
		// 					  // 仅为示例，并非真实的接口地址
		// 					  data: {
		// 					    user_id: user_id
		// 					  },
		// 					  header: {
		// 					    'content-type': 'application/x-www-form-urlencoded',
		// 					    'Accept': 'application/json'
		// 					  },
		// 					  method: 'POST',
							
		// 					  success(res) {
		// 					    if (res.data.address == null) {
		// 					      wx.showLoading({
		// 					        title: '还没有地址，去添加吧'
		// 					      });
		// 					      setTimeout(function () {
		// 					        wx.hideLoading();
		// 					      }, 1000);
		// 					    } else {
		// 					      that.setData({
		// 					        address: res.data.address
		// 					      });
		// 					    }
		// 					  }
							
		// 					});
		// 					var type = this.ordertype;
							
		// 					if (type == 'zhijie') {
		// 					  var city = uni.getStorageSync('city');
		// 					  // var openid = wx.getStorageSync('code');
		// 					  // this.setData({
		// 					  //   newagent: newagent
		// 					  // });
		// 					  var zhijie = JSON.parse(this.car);
		// 					  var goods = [];
		// 					  goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + user_id + '/' );
		// 					  // goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + unionId + '/' + newagent.agent_id);
		// 					  var that = this;
		// 					  wx.request({
		// 					    url: api + '/SupermarketApi/Order/index11',
		// 					    // 仅为示例，并非真实的接口地址
		// 					    data: {
		// 					      goods: goods,
		// 					      address_id: this.address.address_id,
		// 						  city_id:city["city_id"]
		// 					    },
		// 					    header: {
		// 					      'content-type': 'application/x-www-form-urlencoded',
		// 					      'Accept': 'application/json'
		// 					    },
		// 					    method: 'POST',
							
		// 					    success(res) {
		// 					      console.log('res');
		// 					      console.log(res);
		// 					      console.log('res');
		// 					      that.setData({
		// 					        total_fee: res.data.pricesum,
		// 					        order_num: res.data.order_num
		// 					      });
		// 					      var total_fee = that.total_fee;
		// 					      var order_num = that.order_num;
							
		// 					      if (total_fee != null && order_num != null) {
		// 							  wx.request({
		// 							      url: api + '/SupermarketApi//Order/pay2',
		// 							        method: "POST",
		// 							        data: {
		// 							          total_fee: total_fee,
		// 							          order_num: order_num
		// 							        },
		// 							        header: {
		// 							          'content-type': 'application/x-www-form-urlencoded' // 默认值
									      									  
		// 							        },
		// 							        success: function (res) {
		// 							          //后端返回的数据
		// 							          var data = res.data;
		// 							          console.log('data');
		// 							          console.log(data);
		// 							          console.log(data['timeStamp']);
										
		// 							      		uni.requestPayment({
		// 							      		    provider: 'wxpay',
		// 							      		    orderInfo: data, //微信、支付宝订单数据
		// 							      		    success: function (res) {
		// 							      		        console.log('success:' + JSON.stringify(res));
		// 												uni.showToast({
		// 												    title: '支付成功',
		// 												    duration: 2000
		// 												});
		// 												setTimeout(function () {
		// 												  uni.hideToast();
		// 												  uni.redirectTo({
		// 												  	url: '/pages/my/my',
		// 												  });
		// 												}, 1000);
		// 							      		    },
		// 							      		    fail: function (err) {
		// 							      		        console.log('fail:' + JSON.stringify(err));
		// 												uni.showToast({
		// 												    title: '支付失败',
		// 												    duration: 2000
		// 												});
		// 							      		    }
		// 							      		});							  					  
		// 							        }
		// 							      });          
		// 					      }
		// 					    }
							
		// 					  });
		// 					} else if (type == 'gouwuche') {
		// 					  var city = uni.getStorageSync('city');
		// 					  // var openid = wx.getStorageSync('code');
		// 					  // this.setData({
		// 					  //   newagent: newagent
		// 					  // });
		// 					  var cartgoods = JSON.parse(this.car);
		// 					  var goods = [];
							
		// 					  for (var i = 0; i < cartgoods.length; i++) {
		// 					    goods.push(cartgoods[i].cart_id + '/' + cartgoods[i].buy_num);
		// 					  }
							
		// 					  var that = this;
		// 					  wx.request({
		// 					    url: api + '/SupermarketApi/Order/index22',
		// 					    // 仅为示例，并非真实的接口地址
		// 					    data: {
		// 					      goods: goods,
		// 					      user_id: user_id,
		// 					      // newagent_id: newagent.agent_id,
		// 					      address_id: this.address.address_id,
		// 						  city_id:city["city_id"]
		// 					    },
		// 					    header: {
		// 					      'content-type': 'application/x-www-form-urlencoded',
		// 					      'Accept': 'application/json'
		// 					    },
		// 					    method: 'POST',
							
		// 					    success(res) {
		// 					      console.log(res);
		// 					      that.setData({
		// 					        total_fee: res.data.pricesum,
		// 					        order_num: res.data.order_num
		// 					      });
		// 					      var total_fee = that.total_fee;
		// 					      var order_num = that.order_num;
							
		// 					      if (total_fee != null && order_num != null) {
		// 					        wx.request({
		// 					            url: api + '/SupermarketApi/Order/pay2',
		// 					              method: "POST",
		// 					              data: {
		// 					                total_fee: total_fee,
		// 					                order_num: order_num
		// 					              },
		// 					              header: {
		// 					                'content-type': 'application/x-www-form-urlencoded' // 默认值
							            									  
		// 					              },
		// 					              success: function (res) {
		// 					                //后端返回的数据
		// 					                var data = res.data;
		// 					                console.log('data');
		// 					                console.log(data);
		// 					                console.log(data['timeStamp']);
							        										
		// 					            		uni.requestPayment({
		// 					            		    provider: 'wxpay',
		// 					            		    orderInfo: data, //微信、支付宝订单数据
		// 					            		    success: function (res) {
		// 					            		        console.log('success:' + JSON.stringify(res));
		// 					        					uni.showToast({
		// 					        					    title: '支付成功',
		// 					        					    duration: 2000
		// 					        					});
		// 					        					setTimeout(function () {
		// 					        					  uni.hideToast();
		// 					        					  uni.redirectTo({
		// 					        					  	url: '/pages/my/my',
		// 					        					  });
		// 					        					}, 1000);									
		// 					            		    },
		// 					            		    fail: function (err) {
		// 					            		        console.log('fail:' + JSON.stringify(err));
		// 					        					uni.showToast({
		// 					        					    title: '支付失败',
		// 					        					    duration: 2000
		// 					        					});									
		// 					            		    }
		// 					            		});							  					  
		// 					              }
		// 					            });          
		// 					      }
		// 					    }
							
		// 					  });
		// 					}
		// 				}else{
		// 						uni.redirectTo({
		// 							url: '/pages/record/record',
		// 						    success: res => {console.log('res')},
		// 						    fail: () => {console.log('res2')},
		// 						    complete: () => {console.log('res3')}
		// 						});
		// 					}
		// 		    }
		// 		});
		//     }else{
		// 		uni.redirectTo({
		// 			url: '/pages/record/record',
		// 		    success: res => {console.log('res')},
		// 		    fail: () => {console.log('res2')},
		// 		    complete: () => {console.log('res3')}
		// 		});
		// 	}
		// } catch (e) {
		//     // error
			
		// }
      
    },
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
													// var openid = wx.getStorageSync('code');
													wx.request({
													  url: api + '/SupermarketApi/My/findaddress1',
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
													    if (res.data.address == null) {
													      wx.showLoading({
													        title: '还没有地址，去添加吧'
													      });
													      setTimeout(function () {
													        wx.hideLoading();
													      }, 1000);
													    } else {
													      that.setData({
													        address: res.data.address
													      });
													    }
													  }
													
													});
													var type = this.ordertype;
													
													if (type == 'zhijie') {
													  var city = uni.getStorageSync('city');
													  // var openid = wx.getStorageSync('code');
													  // this.setData({
													  //   newagent: newagent
													  // });
													  var zhijie = JSON.parse(this.car);
													  var goods = [];
													  goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + user_id + '/' );
													  // goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + unionId + '/' + newagent.agent_id);
													
													  var that = this;
													  wx.request({
													    url: api + '/SupermarketApi/Order/index11',
													    // 仅为示例，并非真实的接口地址
													    data: {
														  payment_type:0,
													      goods: goods,
													      address_id: this.address.address_id,
														  city_id:city["city_id"]
													    },
													    header: {
													      'content-type': 'application/x-www-form-urlencoded',
													      'Accept': 'application/json'
													    },
													    method: 'POST',
													
													    success(res) {
													      console.log('res');
													      console.log(res);
													      console.log('res');
														 
													      that.setData({
													        total_fee: res.data.pricesum,
													        order_num: res.data.order_num
													      });
													      var total_fee = that.total_fee;
													      var order_num = that.order_num;
													
													      if (total_fee != null && order_num != null) {
															  wx.request({
															      url: api + '/SupermarketApi//Order/pay2',
															        method: "POST",
															        data: {
															          total_fee: total_fee,
															          order_num: order_num
															        },
															        header: {
															          'content-type': 'application/x-www-form-urlencoded' // 默认值
															      									  
															        },
															        success: function (res) {
															          //后端返回的数据
															          var data = res.data;
															          console.log('data');
															          console.log(data);
															          console.log(data['timeStamp']);
																
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
																				  	url: '/pages/my/my',
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
													    }
													
													  });
													} else if (type == 'gouwuche') {
													  var city = uni.getStorageSync('city');
													  // var openid = wx.getStorageSync('code');
													  // this.setData({
													  //   newagent: newagent
													  // });
													  var cartgoods = JSON.parse(this.car);
													  var goods = [];
													
													  for (var i = 0; i < cartgoods.length; i++) {
													    goods.push(cartgoods[i].cart_id + '/' + cartgoods[i].buy_num);
													  }
													
													  var that = this;
													  wx.request({
													    url: api + '/SupermarketApi/Order/index22',
													    // 仅为示例，并非真实的接口地址
													    data: {
														  payment_type:0,
													      goods: goods,
													      user_id: user_id,
													      // newagent_id: newagent.agent_id,
													      address_id: this.address.address_id,
														  city_id:city["city_id"]
													    },
													    header: {
													      'content-type': 'application/x-www-form-urlencoded',
													      'Accept': 'application/json'
													    },
													    method: 'POST',
													
													    success(res) {
													      console.log(res);
													      that.setData({
													        total_fee: res.data.pricesum,
													        order_num: res.data.order_num
													      });
													      var total_fee = that.total_fee;
													      var order_num = that.order_num;
													
													      if (total_fee != null && order_num != null) {
													        wx.request({
													            url: api + '/SupermarketApi/Order/pay2',
													              method: "POST",
													              data: {
													                total_fee: total_fee,
													                order_num: order_num
													              },
													              header: {
													                'content-type': 'application/x-www-form-urlencoded' // 默认值
													            									  
													              },
													              success: function (res) {
													                //后端返回的数据
													                var data = res.data;
													                console.log('data');
													                console.log(data);
													                console.log(data['timeStamp']);
													        										
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
													        					  	url: '/pages/my/my',
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
							else if(e.index==1){
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
													// var openid = wx.getStorageSync('code');
													wx.request({
													  url: api + '/SupermarketApi/My/findaddress1',
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
													    if (res.data.address == null) {
													      wx.showLoading({
													        title: '还没有地址，去添加吧'
													      });
													      setTimeout(function () {
													        wx.hideLoading();
													      }, 1000);
													    } else {
													      that.setData({
													        address: res.data.address
													      });
													    }
													  }
													
													});
													var type = this.ordertype;
													
													if (type == 'zhijie') {
													  var city = uni.getStorageSync('city');
													  // var openid = wx.getStorageSync('code');
													  // this.setData({
													  //   newagent: newagent
													  // });
													  var zhijie = JSON.parse(this.car);
													  var goods = [];
													  goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + user_id + '/' );
													  // goods.push(zhijie[0].num + '/' + zhijie[0].goods_id + '/' + zhijie[0].chavId + '/' + unionId + '/' + newagent.agent_id);
													  var that = this;
													  wx.request({
													    url: api + '/SupermarketApi/Order/index11',
													    // 仅为示例，并非真实的接口地址
													    data: {
														  payment_type:1,
													      goods: goods,
													      address_id: this.address.address_id,
														  city_id:city["city_id"]
													    },
													    header: {
													      'content-type': 'application/x-www-form-urlencoded',
													      'Accept': 'application/json'
													    },
													    method: 'POST',
													
													    success(res) {
													      console.log('res');
													      console.log(res);
													      console.log('res');
													      that.setData({
													        total_fee: res.data.pricesum,
													        order_num: res.data.order_num
													      });
													      var total_fee = that.total_fee;
													      var order_num = that.order_num;
													
													      if (total_fee != null && order_num != null) {
															  wx.request({
															      url: api + '/SupermarketApi/Order/payalipay2',
															        method: "POST",
															        data: {
															          total_fee: total_fee,
															          order_num: order_num
															        },
															        header: {
															          'content-type': 'application/x-www-form-urlencoded' // 默认值
															      									  
															        },
															        success: function (res) {
															          //后端返回的数据
															          var data = res.data;
															          console.log('data');
															          console.log(data);
															          console.log(data['timeStamp']);
																
															      		uni.requestPayment({
															      		    provider: 'alipay',
															      		    orderInfo: data, //支付宝订单数据
															      		    success: function (res) {
															      		        console.log('success:' + JSON.stringify(res));
																				uni.showToast({
																				    title: '支付成功',
																				    duration: 2000
																				});
																				setTimeout(function () {
																				  uni.hideToast();
																				  uni.redirectTo({
																				  	url: '/pages/my/my',
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
													    }
													
													  });
													} else if (type == 'gouwuche') {
													  var city = uni.getStorageSync('city');
													  // var openid = wx.getStorageSync('code');
													  // this.setData({
													  //   newagent: newagent
													  // });
													  var cartgoods = JSON.parse(this.car);
													  var goods = [];
													
													  for (var i = 0; i < cartgoods.length; i++) {
													    goods.push(cartgoods[i].cart_id + '/' + cartgoods[i].buy_num);
													  }
													
													  var that = this;
													  wx.request({
													    url: api + '/SupermarketApi/Order/index22',
													    // 仅为示例，并非真实的接口地址
													    data: {
														  payment_type:1,
													      goods: goods,
													      user_id: user_id,
													      // newagent_id: newagent.agent_id,
													      address_id: this.address.address_id,
														  city_id:city["city_id"]
													    },
													    header: {
													      'content-type': 'application/x-www-form-urlencoded',
													      'Accept': 'application/json'
													    },
													    method: 'POST',
													
													    success(res) {
													      console.log(res);
													      that.setData({
													        total_fee: res.data.pricesum,
													        order_num: res.data.order_num
													      });
													      var total_fee = that.total_fee;
													      var order_num = that.order_num;
													
													      if (total_fee != null && order_num != null) {
													        wx.request({
													            url: api + '/SupermarketApi/Order/payalipay2',
													              method: "POST",
													              data: {
													                total_fee: total_fee,
													                order_num: order_num
													              },
													              header: {
													                'content-type': 'application/x-www-form-urlencoded' // 默认值
													            									  
													              },
													              success: function (res) {
													                //后端返回的数据
													                var data = res.data;
													                console.log('data');
								 					                console.log(data);
													                console.log(data['timeStamp']);
													        										
													            		uni.requestPayment({
													            		    provider: 'alipay',
													            		    orderInfo: data, //支付宝订单数据
													            		    success: function (res) {
													            		        console.log('success:' + JSON.stringify(res));
													        					uni.showToast({
													        					    title: '支付成功',
													        					    duration: 2000
													        					});
													        					setTimeout(function () {
													        					  uni.hideToast();
													        					  uni.redirectTo({
													        					  	url: '/pages/my/my',
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
					
  }
};
</script>
<style>
@import "./confirmOrder.css";
</style>