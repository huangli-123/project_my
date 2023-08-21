<template>
<view class="container">
<form @submit="formSubmit"> 
  <view class="bindText">
    绑定手机号，方便您的取货
  </view>
  <view class="content">
    <view>手机号:</view>
    <view class="getcodeBody flex justifyBetween alignItems">
      <input type="number" :value="phoneNumber" disabled="true" maxlength="13" focus="true"></input>
      <button :class="'getCode ' + (getCodeFlag==true?'dis':'')" :disabled="getCodeFlag" @tap="getCode">{{setTime}}</button>
    </view>
  </view>
  <view class="content">
    <view>验证码:</view>
    <view class="flex justifyBetween">         
        <block v-for="(item, index) in Length" :key="index"> 
        <input class="iptbox" :value="Value.length>=index+1?Value[index]:''" disabled :password="ispassword" @tap.stop="Tap"></input> 
        </block> 
    </view> 
  </view>
 <input name="password" type="number" class="ipt" :maxlength="Length" :focus="isFocus" @input="Focus"></input> 
 <button :class="'huoqu ' + (Value.length==4?'actionActive':'')" :disabled="Value.length==4?false:true" formType="submit">完成绑定</button>
</form>
</view>
</template>

<script>

export default {
  data() {
    return {
      Length: 4,
      //输入框个数 
      isFocus: true,
      //聚焦 
      Value: "",
      //输入的内容 
      ispassword: false,
      setTime: '获取验证码',
      phoneNumber: '13255113320',
      getCodeFlag: false,
      s: 60
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
      console.log(e.detail.value);
      var inputValue = e.detail.value;
      that.setData({
        Value: inputValue
      });
    },

    Tap() {
      var that = this;
      that.setData({
        isFocus: true
      });
    },

    formSubmit(e) {
      console.log(e.detail.value.password);
    },

    getCode() {
      var that = this;
      var s = 60;
      var time = setInterval(function () {
        s--;

        if (s <= 60 && s > 0) {
          that.setData({
            setTime: '（' + s + '）',
            getCodeFlag: true
          });
        } else {
          clearInterval(time);
          that.setData({
            setTime: "获取验证码",
            getCodeFlag: false
          });
        }
      }, 1000);
    }

  }
};
</script>
<style>
@import "./verificationCode.css";
</style>