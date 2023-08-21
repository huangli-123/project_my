<template>
<view class="container">
   <view> 
       <scroll-view class="goodsScrollView flex " scroll-x style="width: 100%" :scroll-left="scrollLeft" scroll-with-animation="true">
           <view v-for="(item, index) in timeList" :key="index" class="spikeGoodItem" :data-id="item.id" @tap="timeCheck">
              <view :class="'spikeGoodItemV flexcolumn justifyCenter alignItems ' + (item.id==chav?'timeActive':'')">
                <view class="time font-size-35">
                    {{item.time}}
                  </view>
                  <view class="text font-size-25">
                    {{item.stateText}}
                  </view>
              </view>
           </view>
        </scroll-view>
   </view>
   <view>
     <view class="mustBuyGoodsItem" :key="index">
          <navigator class="flex" hover-class="none" :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
              <view class="goodLeft">
                <image class="biaoqian" src="/static/images/goods/boom.png"></image>
                <image class="tu" :src="item.photo"></image>
              </view>
              <view class="goodRight flex flexcolumn justifyBetween">
                 <view class="top flex flexcolumn">
                    <text class="title">rdstgsdrtgsdrf</text>
                    <text class="sell">已售22件</text>
                 </view>
                 <view class="bottom">
                     <text class="symbol">￥</text>
                     <text class="price">99</text>
                     <text class="originalPrice">￥199</text>
                 </view>
              </view>
            </navigator>
            <!-- <navigator class="addCar"  hover-class="none">
               <text class="iconfont icon-gouwuchexiadan"></text>
            </navigator> -->
        </view>
   </view>
</view>
</template>

<script>

export default {
  data() {
    return {
      timeList: [{
        id: 1,
        time: "最后",
        stateText: "疯抢"
      }, {
        id: 2,
        time: "10:00",
        stateText: "已开抢"
      }, {
        id: 3,
        time: "15:00",
        stateText: "正在疯抢"
      }, {
        id: 4,
        time: "20:00",
        stateText: "即将开抢"
      }, {
        id: 5,
        time: "明日",
        stateText: "预告"
      }],
      chav: 1,
      scrollLeft: 0
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
    timeCheck(e) {
      this.setData({
        chav: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 120
      });
    }

  }
};
</script>
<style>
@import "./spike.css";
</style>