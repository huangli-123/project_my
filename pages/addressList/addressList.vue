<template>
<view class="container">
   <view v-for="(item, index) in addressList" :key="index" class="addressList">
      <view class="addressItem flex flexStart alignItems">
          <text class="iconfont icon-shouhuodizhi font-size-45 bold huise"></text>
          <view class="content flexcolumn justifyBetween" @tap="navigatorOrder" :data-id="item.address_id">
             <view><text v-if="item.setting==1" class="morenaddress font-size-25">默认</text><text>{{item.user_name}}</text> <text class="huise font-size-25"> {{item.user_phone}}</text></view> 
             <view class="ellipsis font-size-25">{{item.area_id1}}{{item.area_id2}}{{item.area_id3}}{{item.address}}</view>
          </view>
          <view class="huise addressBtn flex justifyEnd alignItems">
            <text @tap="bianji" :data-aid="item.address_id" :data-index="index">编辑</text>
            <text class="line"></text>
            <text class="btn" @tap="deladdress" :data-index="index" :data-aid="item.address_id">删除</text>
          </view>
      </view>
   </view>
   <view @tap="add" class="addAddress">新建地址</view>
</view>
</template>

<script>
// pages/addressList/addressList.js
const app = getApp;
var api = null;
api = require('../../api.js');

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
	  				if(res.data.status==200){
						var user_id = res.data.token.user;
	  					var that = this;
	  					wx.request({
	  					  url: api + '/SupermarketApi/My/useraddresslist2',
	  					  data: {
	  					    user_id: user_id
	  					  },
	  					  header: {
	  					    'Accept': 'application/json'
	  					  },
	  					  method: "GET",
	  					
	  					  success(res) {
	  					    that.setData({
	  					      addressList: res.data.address
	  					    });
	  					  }
	  					
	  					});
	  					
	  					if (options.car) {
	  					  this.setData({
	  					    Tap: true,
	  					    car: options.car,
	  					    orderType: options.type
	  					  });
	  					}	  
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
  methods: {
    navigatorOrder(e) {
      var Tap = this.Tap; // console.log(e)

      var that = this;

      if (Tap == true) {
        wx.redirectTo({
          url: '/pages/confirmOrder/confirmOrder?addressid=' + e.currentTarget.dataset.id + '&car=' + that.car + '&type=' + that.orderType
        });
      } else {
        return;
      }
    },

    bianji(e) {
      var Tap = this.Tap;
      var listtoadd = this.addressList[e.currentTarget.dataset.index];
      wx.setStorageSync('listtoadd', listtoadd);

      if (Tap == true) {
        wx.redirectTo({
          url: '/pages/addAddress/addAddress?type=' + this.orderType + '&car=' + this.car + '&addressid=' + e.currentTarget.dataset.aid
        });
      } else {
        wx.navigateTo({
          url: '/pages/addAddress/addAddress?type=' + this.orderType + '&car=' + this.car + '&addressid=' + e.currentTarget.dataset.aid
        });
      }
    },

    add() {
      var Tap = this.Tap;

      if (Tap == true) {
        wx.redirectTo({
          url: '/pages/addAddress/addAddress?type=' + this.orderType + '&car=' + this.car
        });
      } else {
        wx.navigateTo({
          url: '/pages/addAddress/addAddress?type=' + this.orderType + '&car=' + this.car
        });
      }
    },

    deladdress(e) {
      var addressList = this.addressList;
      var that = this;
      wx.showActionSheet({
        itemList: ['确认'],

        success(res) {
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
								  url: api + '/SupermarketApi/My/deladdress2',
								  data: {
								    user_id: user_id,
								    address_id: e.currentTarget.dataset.aid
								  },
								  header: {
								    'content-type': 'application/x-www-form-urlencoded',
								    'Accept': 'application/json'
								  },
								  method: "POST",
								
								  success(res) {
								    wx.showToast({
								      title: '删除成功!',
								      icon: 'none',
								      duration: 2000
								    });
								    addressList.splice(e.currentTarget.dataset.index, 1);
								    that.setData({
								      addressList: addressList,
												duration:UnlinkOption,
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

        fail(res) {
          console.log(res.errMsg);
        }

      });
    }

  }
};
</script>
<style>
@import "./addressList.css";
</style>