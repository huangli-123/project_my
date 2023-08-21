<template>
<!--index.wxml-->
<view class="container">
    <view class="header">
        <image src="https://jiabusanyi.oss-cn-hangzhou.aliyuncs.com/thumb_5bd7cee32d57d.png"></image>
    </view> 
    <block v-if="hasLocation">
      <view class="address flexcolumn alignItems">
          <text class="t1">当前地址</text>
          <text class="t2">{{address}}</text>
          <navigator class="n3" hover-class="none" url="/pages/nearbLeaders/nearbLeaders">附近其他服务天使</navigator>
      </view>   
      <view class="boxShadow">
          <view class="juli">距离您{{newagent.distance}}km</view>
          <view class="teamMsg flexcolumn alignItems">
              <image :src="newagent.head_portrait"></image>
              <text class="name">服务天使：{{newagent.agent_name}}</text>
              <text class="teamAddress">地址：{{newagent.address}}</text>
              <text class="juli checkTeam" @tap="changeLeader">选择此服务天使</text>
          </view>
      </view>
    </block>
     <button class="dingwei" v-if="!hasLocation" @tap="starAddress"> 开启定位 </button>
     
</view>
</template>

<script>
//index.js
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
      userInfo: {},
      hasLocation: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      hasUserInfo: false,
      address: "",
      province: "",
      city: "",
      district: "",
      newagent: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var address = wx.getStorageSync('address');
    var longitude = wx.getStorageSync('longitude');
    var latitude = wx.getStorageSync('latitude');

    if (!address && !longitude && !latitude) {
      that.getLocation();
    } else {
      that.setData({
        hasLocation: true,
        address: address
      });
      that.getDistance(latitude, longitude);
    }

    var userIdEnc = wx.getStorageSync('userIdEnc');

    if (userIdEnc) {
      this.setData({
        hasUserInfo: true
      });
    }
  },
  onLoad: function () {
    var that = this;

    if (app.globalData.userInfo) {
      wx.setStorageSync('userIdEnc', app.globalData.userInfo);
      var userIdEnc = wx.getStorageSync('userIdEnc');
      that.setData({
        hasUserInfo: true
      });
    } else if (this.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.globalData.userInfoReadyCallback = res => {
        wx.setStorageSync('userIdEnc', res.userInfo);
        var userIdEnc = wx.getStorageSync('userIdEnc');
        that.setData({
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          wx.setStorageSync('userIdEnc', app.globalData.userInfo);
          var userIdEnc = wx.getStorageSync('userIdEnc');
          that.setData({
            hasUserInfo: true
          });
        }
      });
    }
  },
  methods: {
    getLocation() {
      var that = this;
      wx.getLocation({
        type: 'wgs84',

        // 返回可以用于wx.openLocation的经纬度
        success(res) {
          that.setData({
            hasLocation: true
          });
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
        complete: function (res) {// console.log(res);
        }
      });
    },
    getDistance: function (lat1, lng1) {
      var that = this;
      wx.request({
        url: api + '/SupermarketApi/Newagent/index',
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

    starAddress() {
      var that = this;
      wx.openSetting({
        success(res) {
          console.log(res.authSetting);
        }

      });
    },

    changeLeader() {
      var that = this;
      wx.setStorageSync('newagent', that.newagent);
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 100);
    }

  }
};
</script>
<style>
@import "./login.css";
</style>