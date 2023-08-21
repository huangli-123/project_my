<template>
<view class="container">
    <view class="sousuo">
      <navigator url="/pages/search/search">
       <icon type="search" size="12" class="icon"></icon>
       <text> 搜索</text>
      </navigator> 
   </view>
   <view class="content">
     <view class="leftBar" :style="'height:' + height + 'rpx'">
         <scroll-view class="leftBarlist" scroll-y="true" :style="'height:' + (height-90) + 'rpx'">
            <block v-for="(item, index) in fenlei" :key="index">
                <view :class="'leftBarItem ' + (nav==item.cate_id?'leftItemActive':'')" @tap="changeNav" :data-cid="item.cate_id">
                  <view class="kuang"></view>
                  {{item.cate_name}}
                </view>
              </block>  
         </scroll-view>
     </view>
     <view class="rightBar">  
                <!-- <view class="mustBuyGoodsItem">
                        <navigator class="flex"  hover-class="none">
                          <view class="goodLeft">
                            <image class="biaoqian" src="/images/goods/boom.png" />
                            <image class="tu" src="/images/goods/1.jpg" />
                          </view>
                          <view class="goodRight flex flexcolumn justifyBetween">
                            <view class="top flex flexcolumn">
                                <text class="title">火龙果火龙果火龙果火龙果火龙果火龙果火龙果火龙果</text>
                                <text class="sell">已售1455件</text>
                            </view>
                            <view class="bottom">
                                <text class="symbol">￥</text>
                                <text class="price">99</text>
                                <text class="originalPrice">￥199</text>
                            </view>
                          </view>
                        </navigator>
                        <navigator class="addCar"  hover-class="none">
                          <text class="iconfont icon-gouwuchexiadan"></text>
                        </navigator>
                 </view> -->
                 <view class="secondList flex">
                       <view v-for="(item, index) in secondfenlei" :key="index" class="secondItem">
                           <navigator class="flexcolumn alignItems" hover-class="none" :url="'/pages/goodsList/goodsList?id=' + item.cate_id"> 
                             <!-- <image class="tu" :src="apiI + '/attachs/' + item.photo"></image> -->
							 <image class="tu" :src="item.photo"></image>
                             <text>{{item.cate_name}}</text>
                           </navigator>
                       </view>
                 </view>
     </view>
   </view>
</view>
</template>

<script>
// pages/fenlei/fenlei.js
const app = getApp();
var api = null;
api = require("../../api.js");

export default {
  data() {
    return {
      apiI: api,
      nav: 1,
      height: "",
      fenlei: "",
      secondfenlei: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let h = 750 * res.windowHeight / res.windowWidth;
        that.setData({
          height: h
        });
      }
    }); //请求分类

    wx.request({
      url: api + '/SupermarketApi/Goodscate/cate',
      // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值

      },
      method: 'GET',

      success(res) {
        that.setData({
          fenlei: res.data
        });

        if (res) {
          wx.request({
            url: api + '/SupermarketApi/Goodscate/secondcate',
            // 仅为示例，并非真实的接口地址
            data: {
              cate_id: res.data[0].cate_id
            },
            header: {
              'content-type': 'application/json' // 默认值

            },
            method: 'GET',

            success(res2) {
              that.setData({
                secondfenlei: res2.data
              });
            }

          });
        }
      }

    }); //请求分类
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
    changeNav(e) {
      var that = this;
      var cate_id = e.currentTarget.dataset.cid; //请求二级分类

      wx.request({
        url: api + '/SupermarketApi/Goodscate/secondcate',
        // 仅为示例，并非真实的接口地址
        data: {
          cate_id: cate_id
        },
        header: {
          'content-type': 'application/json' // 默认值

        },
        method: 'GET',

        success(res) {
          that.setData({
            secondfenlei: res.data
          });
        }

      }); //请求分类

      that.setData({
        nav: e.target.dataset.cid
      });
    }

  }
};
</script>
<style>
@import "./fenlei.css";
</style>