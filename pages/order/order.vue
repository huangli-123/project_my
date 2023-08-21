<template>
<view class="container">
   <view class="orderTitle">
      <scroll-view class="flex orderTitleList" scroll-x style="width: 100%" :scroll-left="scrollLeft" scroll-with-animation="true">     
         <view v-for="(item, index) in orderStatus" :key="index" :class="'orderTitleItem ' + (item.id==chav?'orderActive':'')" :data-id="item.id" @tap="orderStatusFun">
           <text>{{item.text}}</text><text class="line"></text>
         </view>
      </scroll-view>
   </view>
   <view class="orderList" v-if="order">
       <view v-for="(item, index) in order" :key="index" class="orderItem">
          <!-- <view wx:for="{{item.detail}}"  wx:key="index"> -->
             <view class="borderBottom flex alignItems good" :data-id="item.order_id" :data-status="item.status" @tap="itemLink">
             <view class="flex orderItemTitle">
                <!-- <view class="bold">{{item.merchant.merchant}}</view> -->
                <text class="red font-size-25">{{item.status}}</text>
              </view>
              <view class="flex alignItems" style="width:100%;">
               <image :src="item.photo"></image>
               <view class="textcontent flexcolumn justifyBetween">
                 <text class="font-size-25 row1">{{item.good_title}}</text>
                 <text class="font-size-20 huise">数量：{{item.buy_num}}规格：{{item.specification_title}}</text>
                 <view class="red font-size-25">￥{{item.good_price}}</view>
                 <!-- <navigator class="font-size-20 tuikuan" url="/pages/refund/refund?id={{item.order_id}}"  hover-class="none">退款</navigator> -->
                 <view class="xiaoji text-right">
            <text>共：</text><text class="bold">1件商品 </text><text>小计：</text><text class="bold">￥{{item.total_price}}</text>
          </view>
               </view>
               </view>
             </view>
            
          <!-- </view>   -->
          <view class="kuanye">
          <view class="font-size-20 tuikuan" :data-id="item.order_id" @tap="tuikuan">退款</view>
          </view>
       </view>
       <view class="daodi">
           <text class="huise">已经到底了~</text>
       </view>
   </view>
   <view class="noOrder" v-if="!order">
      <text class="huise">暂时还没有这个订单哦~</text>
   </view>
</view>
</template>

<script>
// pages/order/order.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      orderStatus: [{
        id: 0,
        text: '全部'
      }, // { id: 1, text: '待付款' },
      {
        id: 2,
        text: '待配送'
      }, {
        id: 3,
        text: '已发货'
      }, {
        id: 4,
        text: '已完成'
      }, {
        id: 5,
        text: '待评价'
      }, {
        id: 6,
        text: '已退款'
      }],
      chav: 0,
      scrollLeft: 0,
      order: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id);

    if (options.id) {
      var id = options.id;
      that.setData({
        chav: id
      });
      that.getData(id);
    } else {
      that.getData(0);
    }
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
    orderStatusFun(e) {
      this.setData({
        chav: e.currentTarget.dataset.id,
        scrollLeft: e.currentTarget.dataset.id * 75
      });
      this.getData(e.currentTarget.dataset.id);
    },

    textLeftAnimation() {},

    getData(e) {
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
	  					  url: api + '/SupermarketApi/My/order2',
	  					  // 仅为示例，并非真实的接口地址
	  					  data: {
	  					    user_id: user_id,
	  					    id: e
	  					  },
	  					  header: {
	  					    'Accept': 'application/json' // 默认值
	  					
	  					  },
	  					  method: 'GET',
	  					
	  					  success(res) {
	  					    console.log(res);
	  					    that.setData({
	  					      order: res.data
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

    tuikuan: function (e) {
      wx.request({
        url: api + '/SupermarketApi/Order/refundapply2',
        // 仅为示例，并非真实的接口地址
        data: {
          order_id: e.currentTarget.dataset.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值

        },
        method: 'POST',

        success(res) {
          console.log(res);

          if (res.data.code == "a") {
            wx.showLoading({
              title: '申请已在审核中...'
            });
            setTimeout(function () {
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/order/order'
              });
            }, 1000);
          } else if (res.data.code == "b") {
            wx.showLoading({
              title: '审核成功，退款中...'
            });
            setTimeout(function () {
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/order/order'
              });
            }, 1000);
          } else if (res.data.code == "c") {
            wx.showLoading({
              title: '退款已完成'
            });
            setTimeout(function () {
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/order/order'
              });
            }, 1000);
          } else if (res.data.code == "d") {
            wx.showLoading({
              title: '审核失败...'
            });
            setTimeout(function () {
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/order/order'
              });
            }, 1000);
          } else if (res.data.code == "e") {
            setTimeout(function () {
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/refund/refund?id=' + e.currentTarget.dataset.id
              });
            }, 1000);
          }
        }

      });
    },

    itemLink(e) {
      var order_id = e.currentTarget.dataset.id;
      var status = e.currentTarget.dataset.status;
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail?order_id=' + order_id + '&status=' + status
      });
    }

  }
};
</script>
<style>
@import "./order.css";
</style>