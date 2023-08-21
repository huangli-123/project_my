<template>
<view class="content">
   <view class="head">
       <view class="padding20">
          <view class="bold font-size-30 marginTopBottom20">{{shop_info.merchant}}</view>
          <view class="font-size-25 huise"><text>掌柜:{{shop_info.agent_name}} </text><text>手机号:{{shop_info.phone}}</text></view>
       </view>
   </view>
   <view class="contain">
   <view class="page-section-spacing">
      <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">0
         <swiper-item>
      		<navigator v-for="(item, index) in advert" :key="index"  :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
              <view class="swiper-item uni-bg-red"><image :src="item.photo" mode=""></image></view>
      		</navigator>
         </swiper-item>
      </swiper>            
   </view>
   </view>
   <view class="contnet">
     <view :class="'flex justifyBetween alignItems padding20 ' + (scrollTop==true?'fixedShow':'')">
        <view class="paixu flex justifyStart alignItems" id="paixu">
          <view v-for="(item, index) in paixu" :key="index" :class="'marginRight marginLeft ' + (chavid==item.id?'red':'')" :data-id="item.id" @tap="changePaixu"> {{item.text}}</view>
        </view>
        <text :class="'huise iconfont  ' + (zong==true?'icon-zong':'icon-heng')" @tap="hengzong"></text>
     </view>
     <view class="goods">
        <navigator v-for="(item, index) in goods" :key="index" :class="zong==true?'goodsItem':'heng'" :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
           <view class="img">
             <image :src="item.photo"></image>
           </view>
           <view class="text">
           
               <view class="title">{{item.title}}</view>
               <view class="font-size-25"><text class="red">￥</text><text class="bold red font-size-30">{{item.price}}</text><text class="huise  marginLeft huise">{{item.sold_num}}人付款</text></view>
           </view>

        </navigator>
        <!-- <navigator class="{{zong==true?'goodsItem':'heng'}}" url="">
           <view class="img">
             <image src="/images/goods/1.jpg" />
           </view>
           <view class="text">
               <view class="title">下鸭蛋特别好吃等等等等</view>
               <view class="font-size-25"><text class="red">￥</text><text class="bold red font-size-30">22.99</text><text class="huise marginLeft huise">122人付款</text></view>
           </view>
        </navigator> -->
     </view>
   </view>
</view>
</template>

<script>
// pages/store/index/index.js
const app = getApp();
var api = null;
api = require("../../../api.js");

export default {
  data() {
    return {
      paixu: [{
        id: 1,
        text: "默认"
      }, {
        id: 2,
        text: "销量"
      }, {
        id: 3,
        text: "价格"
      }, {
        id: 4,
        text: "上架时间"
      }],
      chavid: 1,
      zong: false,
      scrollTop: false,
      goods: "",
	  advert:"",
      agent_id: "",
      shop_info: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var agent_id = options.agent_id;
    var that = this;
    that.setData({
      agent_id: options.agent_id
    });
    wx.request({
      url: api + '/SupermarketApi/Store/index',
      // 仅为示例，并非真实的接口地址
      data: {
        agent_id: agent_id,
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
		  console.log(res)
        that.setData({
          goods: res.data.goods,
		  advert:res.data.advert,
          shop_info: res.data.shop_info
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
    changePaixu(e) {
      this.setData({
        chavid: e.currentTarget.dataset.id
      });
    },

    hengzong() {
      this.setData({
        zong: !this.zong
      });
    },

    onPageScroll: function (e) {
      if (e.scrollTop >= 70) {
        this.setData({
          scrollTop: true
        });
      } else {
        this.setData({
          scrollTop: false
        });
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    changePaixu(e) {
      this.setData({
        chavid: e.currentTarget.dataset.id
      });
      var that = this;
      wx.request({
        url: api + '/SupermarketApi/Store/index',
        // 仅为示例，并非真实的接口地址
        data: {
          order: e.currentTarget.dataset.id,
          agent_id: this.agent_id
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          console.log(res);
          that.setData({
            goods: res.data.goods
          });
        }

      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>