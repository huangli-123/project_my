<template>
<view class="container">
    <view class="header flex justifyBetween alignItems">
         <view class="left">
             <view class="name">{{userIdEnc.nickName}}</view>
             <view>开启美好的一天</view>
         </view>
         <view class="pic">
           <image :src="userIdEnc.avatarUrl"></image>
         </view>
    </view>
    <view class="boxShadow order">
        <view class="orderTitle flex justifyBetween alignitems">
            <text>我的订单</text>
            <navigator hover-class="none" url="/pages/order/order">
              <text>查看全部</text>
              <text class="iconfont icon-icon_arrow_right font-size-25"></text>
            </navigator>
        </view>
        <view class="orderContent flex justifyAround alignItems">
           <!-- <navigator class="flexcolumn alignItems" hover-class="none" url="/pages/order/order?id=1">
              <text class="iconfont icon-daifukuan"></text>
              <text>待付款</text>
               <view class="number" wx:if="{{number.daifukuang!=0}}">{{number.daifukuang}}</view>
            </navigator> -->
            <navigator class="flexcolumn alignItems" hover-class="none" url="/pages/order/order?id=2">
              <text class="iconfont icon-daifahuo"></text>
              <text>待配送</text>
              <view class="number" v-if="number.daipeisong!=0">{{number.daipeisong}}</view>
            </navigator>
             <navigator class="flexcolumn alignItems" hover-class="none" url="/pages/order/order?id=3">
              <text class="iconfont icon-yifahuo"></text>
              <text>已发货</text>
              <view class="number" v-if="number.yifahuo!=0">{{number.yifahuo}}</view>
            </navigator> 
            <navigator class="flexcolumn alignItems" hover-class="none" url="/pages/order/order?id=4">
              <text class="iconfont icon-gongsidizhi"></text>
              <text>已完成</text>
              <view class="number" v-if="number.daiziti!=0">{{number.daiziti}}</view>
            </navigator>
            <navigator class="flexcolumn alignItems" url="/pages/order/order?id=5">
              <text class="iconfont icon-tuihuanhuo"></text>
              <text>待评价</text>
              <view class="number" v-if="number.daipingjia!=0">{{number.daipingjia}}</view>
            </navigator>
        </view>
    </view>
    <view class="boxShadow chooseUrl">
       <navigator url="/pages/addressList/addressList" class="UrlItem flex justifyBetween alignItems" hover-class="none">
          <view class="flex alignItems">
             <text class="iconfont icon-zizhi"></text>
             <text>我的地址</text>
          </view>
          <view class="flex justifyEnd alignItems">
             <text></text>
             <text class="iconfont icon-icon_arrow_right"></text>
          </view>
       </navigator>
       
       <!-- <navigator class="UrlItem flex justifyBetween alignItems" hover-class='none'>
          <view class="flex alignItems">
             <text class="iconfont icon-zizhi"></text>
             <text>资质规则</text>
          </view>
          <view>
             <text class='iconfont icon-icon_arrow_right'></text>
          </view>
       </navigator> -->
       <view class="UrlItem flex justifyBetween alignItems" @tap="call">
          <view class="flex alignItems">
             <text class="iconfont icon-kefu"></text>
             <text>联系客服</text>
          </view>
           <view class="flex justifyEnd alignItems">
             <view>0510-82721813</view>
             <text class="iconfont icon-icon_arrow_right"></text>
          </view>
       </view>
	   <view class="UrlItem flex justifyBetween alignItems">
	      <view class="flex alignItems">
	         <text class="iconfont icon-tuichu"></text>
	         <view class="btnlogin" @tap="signOut">退出登录</view>
	      </view>
	       <view class="flex justifyEnd alignItems">
	         <text class="iconfont icon-icon_arrow_right"></text>
	      </view>
	   </view>
	   <!-- <navigator  url="" class="UrlItem flex justifyBetween alignItems" hover-class="none"> -->
	  <!-- <view class="UrlItem flex justifyBetween alignItems">
	      <view class="flex alignItems">
	         <text class="iconfont icon-tuichu"></text>
	         <button class="btnlogin" @tap="signOut">退出登录</button>
	      </view>
	      <view class="flex justifyEnd alignItems">
	         <text></text>
	         <text class="iconfont icon-icon_arrow_right"></text>
	      </view>
		</view> -->
	   <!-- </navigator> -->
	   <navigator url="/pages/about/about" open-type="navigate" class="UrlItem flex justifyBetween alignItems">
		   <view class="flex alignItems">
		      <text class="iconfont icon-guanyu"></text>
		      <text>关于</text>
		   </view>
		   <view class="flex justifyEnd alignItems">
		      <text></text>
		      <text class="iconfont icon-icon_arrow_right"></text>
		   </view>
	   </navigator>
	   <!-- <navigator url="../merchant/merchant" class="UrlItem flex justifyBetween alignItems" hover-class="none">
	   		   <view class="flex alignItems">
	   		      <text class="iconfont icon-wodeshanghu" style="color: #DC5563;"></text>
	   		      <text>成为商户</text>
	   		   </view>
	   		   <view class="flex justifyEnd alignItems">
	   		      <text></text>
	   		      <text class="iconfont icon-icon_arrow_right"></text>
	   		   </view>
	   </navigator> -->
	   <view class="UrlItem flex justifyBetween alignItems">
	      <view class="flex alignItems">
	         <text class="iconfont icon-wodeshanghu" style="color: #DC5563;"></text>
	         <view class="btnlogin" @tap="applyMerchants">成为商户</view>
	      </view>
	       <view class="flex justifyEnd alignItems">
	         <text class="iconfont icon-icon_arrow_right"></text>
	      </view>
	   </view>
	   <!-- <navigator url="../commission/commission" class="UrlItem flex justifyBetween alignItems" hover-class="none">
	   		   <view class="flex alignItems">
	   		      <text class="iconfont icon-3" style="color: #009BFF;"></text>
	   		      <text>成为代理商</text>
	   		   </view>
	   		   <view class="flex justifyEnd alignItems">
	   		      <text></text>
	   		      <text class="iconfont icon-icon_arrow_right"></text>
	   		   </view>
	   </navigator> -->
	   <view class="UrlItem flex justifyBetween alignItems">
	      <view class="flex alignItems">
	         <text class="iconfont icon-3" style="color: #009BFF;"></text>
	         <view class="btnlogin" @tap="applyAgent">成为代理商</view>
	      </view>
	       <view class="flex justifyEnd alignItems">
	         <text class="iconfont icon-icon_arrow_right"></text>
	      </view>
	   </view>
	   <view class="UrlItem flex justifyBetween alignItems">
	      <view class="flex alignItems">
	         <text class="iconfont icon-3" style="color: #009BFF;"></text>
	         <view class="btnlogin" @tap="agentCenter">代理商中心</view>
	      </view>
	       <view class="flex justifyEnd alignItems">
	         <text class="iconfont icon-icon_arrow_right"></text>
	      </view>
	   </view>
	   <!-- <navigator url="../personal/personal" class="UrlItem flex justifyBetween alignItems" hover-class="none">
	   		   <view class="flex alignItems">
	   		      <text class="iconfont icon-3" style="color: #009BFF;"></text>
	   		      <text>代理商中心</text>
	   		   </view>
	   		   <view class="flex justifyEnd alignItems">
	   		      <text></text>
	   		      <text class="iconfont icon-icon_arrow_right"></text>
	   		   </view>
	   </navigator> -->
    </view>
    <!-- <view class="boxShadow erweima flexcolumn alignItems">
       <view class="erweimaTitle">
          提货时，向团长出示二维码提货
       </view>
       <view>
         <image style="background:pink;width:200rpx;height:200rpx;" />
       </view>
    </view> -->
	
</view>
</template>

<script>
// pages/bind/vipReg/vipReg.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      userIdEnc: "",
      number: ""
    };
  },

  components: {},
  props: {},

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
	try {
	    const value = uni.getStorageSync('token');
		console.log('value')
		console.log(value)
		console.log('value')
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
						  url: api + '/SupermarketApi/My/index1',
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
						      number: res.data
						    });
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
    call() {
      wx.makePhoneCall({
        phoneNumber: '0510-82721813' //仅为示例，并非真实的电话号码

      });
    },
	signOut() {
		uni.clearStorage();
		uni.switchTab({
		    url: '/pages/index/index'
		});
	},
	applyMerchants(){
		try {
		    const token = uni.getStorageSync('token');
		    if (token) {
				uni.request({
				    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
				    data: {
				        token: token,
				    },
					method:'GET',
				    header: {
				        'custom-header': "hello", //自定义请求头信息
				    },
				    success: (res) => {
						if(res.data.status==200){
							var user_id = res.data.token.user;
							uni.request({
							  url: api + '/SupermarketApi/Agent/apply',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    user_id: user_id,
							  },
							  header: {
							    'content-type': 'application/x-www-form-urlencoded' // 默认值
							  
							  },
							  method: 'GET',
							  success(res) {
																																																														
								if(res.data.code ==7){
									uni.navigateTo({
										url: '/pages/commission/three',
									    success: res => {console.log(res)},
									    fail: (res) => {console.log(res)},
									    complete: (res) => {console.log(res)}
									}); 
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
								}else if(res.data.code==2 || res.data.code==3){
									uni.navigateTo({
										url: '/pages/commission/two',
									    success: res => {console.log(res)},
									    fail: (res) => {console.log(res)},
									    complete: (res) => {console.log(res)}
									}); 
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
									
								}else if(res.data.code==1 || res.data.code==4|| res.data.code==5|| res.data.code==6){
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
								}else{
									uni.navigateTo({
										url: '/pages/merchant/merchant',
									    success: res => {console.log(res)},
									    fail: (res) => {console.log(res)},
									    complete: (res) => {console.log(res)}
									}); 
								}
							    
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
	applyAgent(){
		try {
		    const token = uni.getStorageSync('token');
		    if (token) {
				uni.request({
				    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
				    data: {
				        token: token,
				    },
					method:'GET',
				    header: {
				        'custom-header': "hello", //自定义请求头信息
				    },
				    success: (res) => {
						if(res.data.status==200){
							var user_id = res.data.token.user;
							uni.request({
							  url: api + '/SupermarketApi/Newagent/apply',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    user_id: user_id,
							  },
							  header: {
							    'content-type': 'application/x-www-form-urlencoded' // 默认值
							  },
							  method: 'GET',
							  success(res) {
								  console.log(res)
								if(res.data.code ==7){
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
								}else if(res.data.code==2 || res.data.code==3){
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
									uni.navigateTo({
										url: '/pages/commission/two2',
									    success: res => {console.log(res)},
									    fail: (res) => {console.log(res)},
									    complete: (res) => {console.log(res)}
									}); 
								}else if(res.data.code==1 || res.data.code==4|| res.data.code==5|| res.data.code==6){
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
								}else{
									uni.navigateTo({
										url: '/pages/commission/commission',
									    success: res => {console.log('res')},
									    fail: () => {console.log('res2')},
									    complete: () => {console.log('res3')}
									}); 
								}
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
	agentCenter(){
		try {
		    const token = uni.getStorageSync('token');
		    if (token) {
				uni.request({
				    url: 'https://www.jiabusanyi.com/SupermarketApi/Passport/checkToken', //仅为示例，并非真实接口地址。
				    data: {
				        token: token,
				    },
					method:'GET',
				    header: {
				        'custom-header': "hello", //自定义请求头信息
				    },
				    success: (res) => {
						
						if(res.data.status==200){
							var user_id = res.data.token.user;
							uni.request({
							  url: api + '/SupermarketApi/Newagent/personal',
							  // 仅为示例，并非真实的接口地址
							  data: {
							    user_id: user_id,
							  },
							  header: {
							    'content-type': 'application/x-www-form-urlencoded' // 默认值
							  
							  },
							  method: 'GET',
							  success(res) {
								if(res.data.code ==1 || res.data.code==2){
									uni.showToast({
									  title: res.data.msg,
									  icon: 'none',
									  duration: 2000,
									});	
								}else{
									uni.navigateTo({
										url: '/pages/personal/personal',
									    success: res => {console.log(res)},
									    fail: (res) => {console.log(res)},
									    complete: (res) => {console.log(res)}
									}); 
								}
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
};
</script>
<style>
@import "./my.css";
</style>