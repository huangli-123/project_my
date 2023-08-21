<template>
<view>
   <view class="flex justifyBetween alignItems padding20 borderBottom">
      <view>商品评价({{evaluationListcount}})</view>
      <view></view>
   </view>
   <view class="evaluationList">
        <view v-for="(item, index) in comment" :key="index" class="evaluationItem borderBottom">
            <view class="flex justifyBetween alignItems">
               <view class="flex alignItems">
                  <!-- <image class="headerPic" :src="item.avatarUrl"></image> -->
                  <text class="font-size-25 overflow">{{item.account}}</text>
               </view>
                <view class="starItem" v-if="item.allStar == 1">
                    <text class="iconfont icon-buoumaotubiao44"></text>
                   
                </view>
                <view class="starItem" v-else-if="item.allStar == 2">
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                   
                </view>
                <view class="starItem" v-else-if="item.allStar == 3">
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
              
                </view>
                <view class="starItem" v-else-if="item.allStar == 4">
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                  
                </view>
                <view class="starItem" v-else-if="item.allStar == 5">
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                    <text class="iconfont icon-buoumaotubiao44"></text>
                </view>
                <view class="starItem" v-else>
                </view>
            </view>
            <view class="evaluationItem-content">
                <view class="marginTopBottom20">{{item.content}}</view>
                <view class="flex picList">
                    <block v-for="(item, index2) in item.Aimages" :key="index2">
                    <image :src="api + '/attachs/' + item.image"></image>
                    </block>
                </view>
                <view class="date huise font-size-25">{{item.created_time}}</view>
            </view>
         </view>             
   </view>
</view>
</template>

<script>
// pages/evaluationList/evaluationList.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      api: api,
      comment: "",
      evaluationListcount: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var goods_id = options.id;
    wx.request({
      url: api + '/SupermarketApi/My/evaluationList',
      // 仅为示例，并非真实的接口地址
      data: {
        goods_id: goods_id
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        that.setData({
          comment: res.data.evaluationList,
          evaluationListcount: res.data.evaluationListcount
        });
        console.log(res.data.evaluationList);
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
  methods: {}
};
</script>
<style>
@import "./evaluationList.css";
</style>