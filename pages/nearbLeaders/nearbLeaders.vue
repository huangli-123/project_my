<template>
<view class="container">
   <view class="header">
     <view class="font-size-25">您所在的当前位置</view>
     <view class="address flex justifyBetween alignItems">
        <view class="font-size-30 bold">{{address}}</view>
        <view class="font-size-25 xiugai" @tap="xiugaiaddress">修改地址</view>
     </view>
   </view>
   <view class="leaderList">
       <view v-for="(item, index) in newagent" :key="index" class="leaderItem flex" :data-index="index" @tap="xuanze">
           <view>
              <image :src="item.head_portrait"></image>
           </view>
           <view class="flex justifyBetween alignItems itemContent marginLeft">
              <view class="flexcolumn justifyBetween itemContentText">
                 <view class="flex justifyBetween  alignItems">
                   <text class="bold font-size-25">服务天使：{{item.agent_name}}</text>
                   <text class="red font-size-23">距离您{{item.distance}}Km</text>
                 </view>
                 <text class="font-size-25 huise">取货地址：{{item.address}}</text>
              </view>
              <text class="iconfont icon-icon_arrow_right huise font-size-30 marginLeft"></text>
           </view>
       </view>
   </view>
</view>
</template>

<script>
// pages/nearbLeaders/nearbLeaders.js
//获取应用实例
const app = getApp();
var api = null;
api = require("../../api.js");
var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'WSPBZ-TABW4-4ZRUZ-DO4C2-KQBUF-SLFDV' //这里自己的key秘钥进行填充

});

export default {
  data() {
    return {
      hasLocation: false,
      province: "",
      city: "",
      district: "",
      address: "",
      newagent: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var address = wx.getStorageSync('address');
    var longitude = wx.getStorageSync('longitude');
    var latitude = wx.getStorageSync('latitude');
    console.log(address);

    if (!address && !longitude && !latitude) {
      that.getLocation();
    } else {
      that.setData({
        address: address
      });
      that.getDistance(latitude, longitude);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getLocation() {
      var that = this;
      wx.getLocation({
        type: 'gcj02',

        // 返回可以用于wx.openLocation的经纬度
        success(res) {
          that.setData({
            hasLocation: true
          });
          console.log(res);
          const latitude = res.latitude;
          const longitude = res.longitude;
          that.getLocal(latitude, longitude);
        },

        fail(res) {
          that.setData({
            hasLocation: false
          });
        }

      });
    },

    // 获取当前地理位置
    getLocal: function (latitude, longitude) {
      var that = this;
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          var province = res.result.ad_info.province;
          var city = res.result.ad_info.city;
          var district = res.result.ad_info.district;
          var address = res.result.address;
          that.setData({
            province: province,
            city: city,
            district: district,
            address: address
          });
          that.getDistance(latitude, longitude);
        },
        fail: function (res) {},
        complete: function (res) {}
      });
    },
    getDistance: function (lat1, lng1) {
      var that = this;
      wx.request({
        url: api + '/SupermarketApi/Newagent/index2',
        // 仅为示例，并非真实的接口地址
        data: {
          latitude: lat1,
          longitude: lng1
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          that.setData({
            newagent: res.data
          });
        }

      });
    },

    xuanze(e) {
      var index = e.currentTarget.dataset.index;
      var list = this.newagent;
      wx.setStorageSync('newagent', list[index]);
      console.log(index);
      console.log(list);
      console.log(wx.getStorageSync('newagent'));
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 100);
    },

    xiugaiaddress() {
      var that = this;
      wx.chooseLocation({
        success: function (res) {
          // success
          that.getDistance(res.latitude, res.longitude);
          that.setData({
            address: res.address
          });
          wx.setStorageSync('latitude', res.latitude);
          wx.setStorageSync('longitude', res.longitude);
          wx.setStorageSync('address', res.address);
        },
        fail: function () {// fail
        },
        complete: function () {// complete
        }
      });
    }

  }
};
</script>
<style>
@import "./nearbLeaders.css";
</style>