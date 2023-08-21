<template>
  <div id="pusher" style="width:300px;height:400px;background-color:#000000;margin:auto"></div>  
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
    const currentWebview = this.$mp.page.$getAppWebview()  
    var pusher = plus.video.createLivePusher("", {    
    url:'rtmp://testlivesdk.v0.upaiyun.com/live/upyunb',    
    top:'100px',    
    left:'0px',    
    width: '100%',    
    height: '300px',    
    position: 'static'    
    });    
    currentWebview.append(pusher);  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
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

  }
};
</script>
<style>
@import "./livetelecast.css";
</style>