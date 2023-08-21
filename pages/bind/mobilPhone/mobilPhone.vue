<template>
<view class="container">
    <view class="bindText">
      <view>首次购买需要绑定手机号</view>
      <view>方便您取货</view>
    </view>
    <view class="bindButton">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信授权绑定当前手机号</button>
      <navigator url="/pages/bind/vipReg/vipReg" hover-class="none">手机号绑定</navigator>
    </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
    getPhoneNumber: function (e) {
      console.log(e.detail.errMsg);
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
    }
  }
};
</script>
<style>
@import "./mobilPhone.css";
</style>