<template>
<view class="container">
   <view class="header">
     <view class="font-size-35">
       <!-- <text wx:if="{{status=='待付款'}}">待付款</text> -->
        <text v-if="status=='待配送'">待配送</text>
         <text v-if="status=='已发货'">已发货</text>
          <text v-if="status=='待自提'">待自提</text>
           <text v-if="status=='待评价'">待评价</text>
            <text v-if="status=='已完成'">已完成</text>
             <text v-if="status=='已取消'">已取消</text>
     </view>  
   </view>
    <view class="address flex alignItems">
       <text class="iconfont icon-shouhuodizhi"></text>
       <view>
          <view class="flex alignItems">
            <view class="tuzhang">收货地址</view>
            <text class="bold marginLeft">{{ordertail.user_name}}</text> 
            <text class=" marginLeft">{{ordertail.user_phone}}</text>                
            
          </view>
           <view class="quhuo">{{ordertail.area1}}{{ordertail.area2}}{{ordertail.area3}}{{ordertail.address}}</view>
       </view>
    </view>
     <view class="goodsList">
       <view class="dianpu">
           <view class="dianpuTitle flex alignItems">
              <image :src="ordertail.shop_image"></image>
              <text class="huise">{{ordertail.merchant}}</text>
           </view>
                 <view class="dianpuContent flex">
                   <image :src="ordertail.photo"></image>
                   <view class="goods flexcolumn justifyBetween">
                      <view class="flexcolumn">
                        <text>{{ordertail.good_title}}</text>
                        <text class="huise font-size-25">{{ordertail.specification_title}}</text>
                      </view>
                      <view class="flex justifyBetween alignItems">
                          <view>
                              <text class="symbol">￥</text>
                              <text class="price">{{ordertail.good_price}}</text>
                          </view>
                          <view v-if="status=='待付款'">x {{ordertail.buy_num}}</view>
                          <!-- <view class="shouhouBtn" bindtap='goRefund' wx:if="{{status=='待配送'||status=='已发货'||status=='待自提'||status=='已完成'}}">申请退款</view> -->
                          <view class="flex" v-if="status=='待评价'">
                            <!-- <view class="shouhouBtn" bindtap='goRefund'>申请退款</view> -->
                            <view class="pingjiaBtn" :data-id="ordertail.order_id" :data-goodsid="ordertail.goods_id" @tap="goPingjia">去评价</view>
                          </view>
                      </view>
                   </view>
                  </view> 
       </view>
      </view>
       <view class="youhuiquan flex justifyBetween alignItems">
            <text>商品金额</text>          
            <text>￥{{ordertail.total_price}}</text>      
       </view>
       <view class="wuliu" v-if="status=='已发货'||status=='待自提'||status=='已完成'||status=='待评价'">
          <view class="font-size-30"><text>物流详情</text></view>
          <view v-for="(item, index) in logistics" :key="index">
              <view class="font-size-25 huise"><text class="bold">{{item.AcceptTime}}</text> <text>{{item.AcceptStation}}</text></view>
          </view>
       </view>
       <view class="youhuiquan  huise">
          <view class="font-size-25">订单编号：{{ordertail.order_num}}</view>
          <view class="font-size-25">下单时间：{{ordertail.create_time}}</view>
       </view>
       <view style="height:150rpx"></view>
       <view class="bottom flex justifyEnd alignItems" v-if="status=='待配送'||status=='待付款'">
           <view v-if="status=='待付款'">
             <text>实付金额：</text>
             <text class="red">￥{{ordertail.total_price}}</text>
           </view>
           <navigator url="/pages/index/index" open-type="switchTab" hover-class="none">返回首页</navigator>
            <view class="goPay" :data-total_fee="ordertail.total_price" :data-order_num="ordertail.order_num" @tap="goPay" v-if="status=='待付款'">继续支付
            </view> 
            <view class="goPay" v-if="status=='待配送'" @tap="fahuo">提醒发货
            </view> 
       </view>        

       
</view>
</template>

<script>
// pages/orderDetail/orderDetail.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      status: "",
      ordertail: "",
      logistics: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      status: options.status
    });
    wx.request({
      url: api + '/SupermarketApi/My/orderDetail1',
      // 仅为示例，并非真实的接口地址
      data: {
        id: options.order_id
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        console.log(res); // console.log(res.data.fenordertail)

        that.setData({
          ordertail: res.data.ordertail // fenordertail:res.data.fenordertail

        });
      }

    });
    wx.request({
      url: api + '/SupermarketApi/My/logistics',
      // 仅为示例，并非真实的接口地址
      data: {
        id: options.order_id
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        console.log(res);
        that.setData({
          logistics: res.data.Traces.reverse()
        });
      }

    });
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
    goPay: function (e) {
      var total_fee = e.currentTarget.dataset.total_fee;
      var order_num = e.currentTarget.dataset.order_num;
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
      // wx.login({
      //   success: res => {
      //     //code 用于获取openID的条件之一
      //     var code = res.code;
      //     wx.request({
      //       url: api + '/SupermarketApi//Order/pay',
      //       method: "POST",
      //       data: {
      //         total_fee: total_fee,
      //         code: code,
      //         order_num: order_num
      //       },
      //       header: {
      //         'content-type': 'application/x-www-form-urlencoded' // 默认值

      //       },
      //       success: function (res) {
      //         //后端返回的数据
      //         var data = res.data; // console.log(data);
      //         // console.log(data["timeStamp"]);

      //         wx.requestPayment({
      //           timeStamp: data['timeStamp'],
      //           nonceStr: data['nonceStr'],
      //           package: data['package'],
      //           signType: data['signType'],
      //           paySign: data['paySign'],
      //           success: function (res) {
      //             wx.showModal({
      //               title: '支付成功',
      //               content: ''
      //             });
      //             wx.navigateTo({
      //               url: '/pages/my/my'
      //             });
      //           },
      //           fail: function (res) {
      //             console.log(res);
      //           }
      //         });
      //       }
      //     });
      //   }
      // });
    },

    goPingjia(e) {
      var order_id = e.currentTarget.dataset.id;
      var goods_id = e.currentTarget.dataset.goodsid;
      wx.request({
        url: api + '/SupermarketApi/My/mycomment',
        // 仅为示例，并非真实的接口地址
        data: {
          order_id: order_id,
          goods_id: goods_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值

        },
        method: 'POST',

        success(res) {
          if (res.data == 'nokk') {
            wx.showLoading({
              title: '已评价，不能重复'
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 1000);
          } else {
            wx.navigateTo({
              url: '/pages/writingEvaluation/writingEvaluation?order_id=' + order_id + '&goods_id=' + goods_id
            });
          }
        }

      });
    },

    goRefund() {
      wx.navigateTo({
        url: '/pages/refund/refund'
      });
    },

    fahuo() {
      wx.showToast({
        title: '提醒成功',
        icon: 'success',
        duration: 2000
      });
    }

  }
};
</script>
<style>
@import "./orderDetail.css";
</style>