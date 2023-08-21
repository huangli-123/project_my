<template>
<view class="container">
   <view class="mustBuyGoodsList">
        <view class="paixu flex justifyAround alignItems">
            <view v-for="(item, index) in paixu" :key="index" :class="chav==item.id?'red':''" :data-id="item.id" @tap="choosePaixu">{{item.text}}</view>
        </view>
<!--          <view style="height:90rpx" v-if="goods"></view> -->
        <view class="mustBuyGoodsItem" v-if="goods">
          <navigator v-for="(item, index) in goods" :key="index" class="flex" hover-class="none" :url="'/pages/goodDetail/goodDetail?id=' + item.goods_id">
              <view class="goodLeft">
                <image v-if="item.is_hot==1" class="biaoqian" src="/static/images/goods/boom.png"></image>
                <image class="tu" :src="item.photo"></image>
              </view>
              <view class="goodRight flex flexcolumn justifyBetween">
                 <view class="top flex flexcolumn">
                    <text class="title">{{item.title}}</text>

                    <text class="sell">已售{{item.sold_num}}{{item.unit}}</text>
                 </view>
                 <view class="bottom">
                     <text class="symbol">￥</text>
                     <text class="price">{{item.price}}</text>
                     <!-- <text class="originalPrice">￥199.99</text> -->
                 </view>
              </view>
            </navigator>
            <!--<navigator class="addCar"  hover-class="none">
               <text class="iconfont icon-gouwuchexiadan"></text>
            </navigator> -->
        </view>
     </view>
</view>
</template>

<script>
// pages/search/search.js
const app = getApp();
var api = null;
api = require("../../api.js");

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
      chav: 1,
      goodslist: [],
      page: 1,
      id: "",
      goods: "",
      goodscount: "",
	  
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    var that = this;
    uni.request({
      url: api + '/SupermarketApi/Goodsdetail/goodslist',
      // 仅为示例，并非真实的接口地址
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        if (res.data.goodslist) {
          that.setData({
            goods: res.data.goodslist,
            goodscount: res.data.goodscount
          });
        } else {
          uni.showLoading({
            title: '没有这样的商品哦！'
          });
          setTimeout(function () {
            uni.hideLoading();
          }, 1000);
        }
      }

    });
  },
  onReachBottom: function () {
    var that = this; // 显示加载图标

    var page = this.page;
    console.log(page);

    if (page < that.goodscount) {
      uni.showLoading({
        title: '玩命加载中'
      });
      uni.request({
        url: api + '/SupermarketApi/Goodsdetail/goodslist/?page=' + page,
        data: {
          id: this.id,
          order: this.chav
        },
        method: "GET",
        // 请求头部
        header: {
          'content-type': 'application/text'
        },
        success: function (res) {
          console.log(res); // // 页数+1

          page++; // // 回调函数

          var goods = that.goods;

          for (var i = 0; i < res.data.goodslist.length; i++) {
            goods.push(res.data.goodslist[i]);
          } // // 设置数据


          that.setData({
            goods: goods,
            page: page
          }); // 隐藏加载框

          uni.hideLoading();
        }
      });
    } else {
      uni.showLoading({
        title: '没有更多了'
      });
      setTimeout(function () {
        uni.hideLoading();
      }, 2000);
    }
  }, 
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    choosePaixu(e) {
      this.setData({
        chav: e.currentTarget.dataset.id,
        page: 1
      });
      var that = this;
      uni.request({
        url: api + '/SupermarketApi/Goodsdetail/goodslist',
        // 仅为示例，并非真实的接口地址
        data: {
          id: that.id,
          order: e.currentTarget.dataset.id
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          that.setData({
            goods: res.data.goodslist
          });
        }

      });
    }

  }
};
</script>
<style>
@import "./goodsList.css";
</style>