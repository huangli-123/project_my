<template>
<!--pages/bind/vipReg/vipReg.wxml-->
<view class="container">
  <view class="bindText">
    绑定手机号，完成注册
  </view>
  <view class="content">
    <view>手机号:</view>
    <input type="number" maxlength="11" focus="true" :value="Value" @input="Focus"></input>
  </view>
  <button :class="'huoqu ' + (flag==true?'actionActive':'')">获取验证码</button>
</view>
</template>

<script>

export default {
  data() {
    return {
      Value: '',
      flag: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
    Focus(e) {
      var that = this;
      var inputValue = e.detail.value;

      if (/^1(3|4|5|7|8)\d{9}$/.test(inputValue)) {
        that.setData({
          flag: true
        });
      } else {
        that.setData({
          flag: false
        });
      }

      that.setData({
        Value: inputValue
      });
    }

  }
};
</script>
<style>
@import "./vipReg.css";
</style>